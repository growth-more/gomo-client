# JWT 인증방식 설계

## 구조

### 1. Zustand 저장소

#### 1.1. useTokenStore

- 엑세스 토큰 저장소
- persist 미들웨어를 사용하여 엑세스 토큰을 로컬 스토리지에 저장
- subscribeWithSelector 미들웨어를 사용하여 엑세스 토큰 변경 감지 허용

#### 1.2. useAuthStore

- 로그인 정보 저장소
- `useTokenStore`의 엑세스 토큰을 subscribe 하여, 엑세스 토큰이 변경되면 로그인 정보를 업데이트

### 2. Axios 인터셉터

#### 2.1. accessTokenInterceptor

- 모든 요청의 Authorization 헤더에 엑세스 토큰을 포함시키는 axios 인터셉터
- `useTokenStore`의 엑세스 토큰을 subscribe 하여, 엑세스 토큰이 변경되면 인터셉터의 엑세스 토큰을 업데이트

#### 2.2. refreshTokenInterceptor

- 엑세스 토큰 만료 시, 리프레시 토큰으로 새로운 엑세스 토큰 재발급을 요청하는 axios 인터셉터
- 내부적으로 새로운 엑세스 토큰을 요청 후, 그 결과를 `useTokenStore`에 저장하고, 기존 요청을 다시 시도
- 리프레시 토큰 또한 만료되어 새로운 엑세스 토큰을 재발급 받을 수 없는 경우, 401 에러 반환

### 3. useAuth 리액트 훅

- 컴포넌트에서 사용할 수 있는 인증 관련 기능을 제공하는 리액트 훅
- 로그인 상태 확인, 로그인, 로그아웃 기능 제공

#### 로그인 로직

1. `LoginRequest`와 함께 백엔드에 로그인 요청
2. 로그인 성공 시, 백엔드에서 발급한 엑세스 토큰을 `useTokenStore`에 저장

#### 로그아웃 로직

1. 백엔드에 로그아웃 요청
2. `useTokenStore`의 엑세스 토큰을 `null`로 업데이트

### 4. MainLayout

- 프론트엔드 앱의 최상위 레이아웃 컴포넌트
- `useTokenStore`가 로컬 스토리지로부터 엑세스 토큰을 로드하면, 해당 토큰을 사용하여 백엔드에 로그인 여부 확인 요청
- 엑세스 토큰이 유효하면 로그인 상태를 업데이트

## 동작 흐름

jwt 인증의 중심은 `useTokenStore` 입니다.

현재 로그인 유저 정보를 관리하는 `useAuthStore`, 엑세스 토큰을 Authorization 헤더에 포함시키는 `accessTokenInterceptor`는 모두 `useTokenStore`의 상태 변화를 관찰하여 자동으로 업데이트 됩니다.
따라서 인증 정보가 변했을 때에는 `useTokenStore`의 상태만 관리하면 됩니다.

엑세스 토큰이 만료된 경우에는 `refreshTokenInterceptor`가 동작하여 리프레시 토큰으로 새로운 엑세스 토큰을 재발급 합니다.
이때 `refreshTokenInterceptor`는 내부적으로 새로운 엑세스 토큰을 `useTokenStore`에 저장하고, 위의 이유로 인하여 `useAuthStore`와 `accessTokenInterceptor`도 함께 업데이트 됩니다.

앱이 처음 실행될 때에는 엑세스 토큰이 만료되었는지 여부를 확인할 수 없습니다. 따라서 `MainLayout`에서 최초 1회 로그인 여부를 확인합니다.
이때에도 기본적으로 `accessTokenInterceptor`와 `useAuthStore`는 업데이트 되어 있는 상태입니다. 즉, 최초 로그인 여부를 확인하기 전까지는 일시적으로 로그인이 된 상태로 취급됩니다.

이후 백엔드 응답으로 200 반환 시, 따로 아무것도 건드리지 않고 현재 로그인 상태를 그대로 이어나갑니다.

반면 401 에러 반환 시, `useTokenStore`의 엑세스 토큰을 `null`로 초기화하고, 이로 인하여 `accessTokenInterceptor`와 `useAuthStore`도 함께 초기화됩니다.

## 시나리오

### 1. 최초 접속 (엑세스 토큰 X, 리프레시 토큰 X)

1. `useTokenStore`에서 persist된 엑세스 토큰 메모리에 로드 시도
   1. 엑세스 토큰이 없으므로 `accessToken`필드는 `null`
2. `MainLayout`에서 백엔드에 로그인 여부 확인 요청 (최초 1회)
   1. 엑세스 토큰이 존재하지 않으므로 401 에러 반환
   2. 401 에러 발생 시 `refreshTokenInterceptor`가 동작하여 리프레시 토큰으로 새로운 엑세스 토큰 재발급 요청
   3. 리프레시 토큰이 존재하지 않으므로 401 에러 반환
   4. 재발급 요청에서 401 에러 반환시 `refreshTokenInterceptor`가 동작하지 않고, 그대로 401 에러 반환
3. `useAuthStore`의 로그인 상태를 `null`로 초기화 (그대로 유지)

### 2. 엑세스 토큰이 만료되지 않은 상태에서 접속 (엑세스 토큰 O, 리프레시 토큰 O)

1. `useTokenStore`에서 persist된 엑세스 토큰 메모리에 로드
   1. `useTokenStore`의 엑세스 토큰을 `subscribe`하고 있던 `accessTokenInterceptor`에서 `Authorization` 헤더의 엑세스 토큰을 업데이트
   2. `useTokenStore`의 엑세스 토큰을 `subscribe`하고 있던 `useAuthStore`에서 엑세스 토큰에 있는 유저 정보로 로그인 상태 업데이트
2. `MainLayout`에서 백엔드에 로그인 여부 확인 요청 (최초 1회)
   1. 엑세스 토큰이 존재하고 만료되지 않았으므로 200 반환
3. `useAuthStore`의 로그인 상태를 그대로 유지

### 3. 엑세스 토큰이 만료된 상태에서 접속 (엑세스 토큰 X, 리프레시 토큰 O)

1. `useTokenStore`에서 persist된 엑세스 토큰 메모리에 로드
   1. `useTokenStore`의 엑세스 토큰을 `subscribe`하고 있던 `accessTokenInterceptor`에서 `Authorization` 헤더의 엑세스 토큰을 업데이트
   2. `useTokenStore`의 엑세스 토큰을 `subscribe`하고 있던 `useAuthStore`에서 엑세스 토큰에 있는 유저 정보로 로그인 상태 업데이트 (만료된 엑세스 토큰을 기반으로 로그인 상태 업데이트)
2. `MainLayout`에서 백엔드에 로그인 여부 확인 요청 (최초 1회)
   1. 엑세스 토큰이 존재하지 않거나, 존재하더라도 만료되었으므로 401 에러 반환
   2. 401 에러 발생 시 `refreshTokenInterceptor`가 동작하여 리프레시 토큰으로 새로운 엑세스 토큰 재발급 요청
   3. 리프레시 토큰이 존재하고 만료되지 않았으므로, 새로운 엑세스 토큰을 발급받음
   4. 새롭게 발급받은 엑세스 토큰을 `useTokenStore`에 저장
      1. `useTokenStore`의 엑세스 토큰을 `subscribe`하고 있던 `accessTokenInterceptor`에서 `Authorization` 헤더의 엑세스 토큰을 업데이트
      2. `useTokenStore`의 엑세스 토큰을 `subscribe`하고 있던 `useAuthStore`에서 엑세스 토큰에 있는 유저 정보로 로그인 상태 업데이트
   5. 새롭게 발급받은 엑세스 토큰으로 이전의 요청을 다시 시도하여 200 반환
3. `useAuthStore`의 로그인 상태를 그대로 유지

### 4. 엑세스 토큰과 리프레시 토큰이 만료된 상태에서 접속 (엑세스 토큰 X, 리프레시 토큰 X)

1. `useTokenStore`에서 persist된 엑세스 토큰 메모리에 로드
   1. 엑세스 토큰이 존재하지 않는 경우 `accessToken`필드는 `null`
   2. 엑세스 토큰이 존재는 하나 만료된 경우 `accessToken`필드는 만료된 엑세스 토큰
      1. `useTokenStore`의 엑세스 토큰을 `subscribe`하고 있던 `accessTokenInterceptor`에서 `Authorization` 헤더의 엑세스 토큰을 업데이트
      2. `useTokenStore`의 엑세스 토큰을 `subscribe`하고 있던 `useAuthStore`에서 엑세스 토큰에 있는 유저 정보로 로그인 상태 업데이트 (만료된 엑세스 토큰을 기반으로 로그인 상태 업데이트)
2. `MainLayout`에서 백엔드에 로그인 여부 확인 요청 (최초 1회)
   1. 엑세스 토큰이 존재하지 않거나, 존재하더라도 만료되었으므로 401 에러 반환
   2. 401 에러 발생 시 `refreshTokenInterceptor`가 동작하여 리프레시 토큰으로 새로운 엑세스 토큰 재발급 요청
   3. 리프레시 토큰이 존재하지 않거나, 존재하더라도 만료되었으므로 401 에러 반환
   4. 재발급 요청에서 401 에러 반환시 `refreshTokenInterceptor`가 동작하지 않고, 그대로 401 에러 반환
3. `useAuthStore`의 로그인 상태를 `null`로 초기화

### 5. 엑세스 토큰은 만료되지 않았지만 리프레시 토큰이 만료된 상태에서 접속 (엑세스 토큰 O, 리프레시 토큰 X)

1. 엑세스 토큰의 만료시간은 30분, 리프레시 토큰의 만료시간은 30일
2. 새로운 엑세스 토큰 재발급 시, 리프레시 토큰 또한 함께 재발급
3. 따라서 엑세스 토큰이 만료되지 않은 상태에서 리프레시 토큰이 만료되는 경우는 없음

### 6. 엑세스 토큰이 만료되지 않은 상태로 접속 중, 다음 요청에서 엑세스 토큰이 만료 (엑세스 토큰 O -> X, 리프레시 토큰 O)

1. 유저가 첫 접속 시에는 엑세스 토큰이 만료되지 않았으므로, `useTokenStore`와 `useAuthStore`에 로그인 정보가 남아있음
2. 접속중인 상태에서 시간이 흘러 엑세스 토큰이 만료되고, 유저는 이를 인지하지 못한채로 새로운 요청을 보냄
   1. 엑세스 토큰이 만료되었으므로 401 에러 반환
   2. 401 에러 발생 시 `refreshTokenInterceptor`가 동작하여 리프레시 토큰으로 새로운 엑세스 토큰 재발급 요청
   3. 리프레시 토큰이 존재하고 만료되지 않았으므로, 새로운 엑세스 토큰을 발급받음
   4. 새롭게 발급받은 엑세스 토큰을 `useTokenStore`에 저장
      1. `useTokenStore`의 엑세스 토큰을 `subscribe`하고 있던 `accessTokenInterceptor`에서 `Authorization` 헤더의 엑세스 토큰을 업데이트
      2. `useTokenStore`의 엑세스 토큰을 `subscribe`하고 있던 `useAuthStore`에서 엑세스 토큰에 있는 유저 정보로 로그인 상태 업데이트
   5. 새롭게 발급받은 엑세스 토큰으로 이전의 요청을 다시 시도하여 200 반환
3. 유저는 엑세스 토큰이 만료되었다는 것을 인지하지 못하고 기존의 요청 결과를 성공적으로 받음
