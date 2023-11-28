react를 실제 프로젝트에서 사용하면서 여러 hook을 사용했었습니다. 보다 hook에 대해 정확히 이해하며 react에 대해서도 좀 더 deep하게 알아보는 시간을 가지려고 합니다.(트러블 슈팅과 효율적인 프로젝트 수행을 위해서)

저는 react docs의 reference를 참조하였습니다.

# Hook
먼저 전체적인 hook의 공통점에 대해 살펴보겠습니다.
- hook은 반복문이나 조건절에서 call 할 수 없습니다. 반드시 컴포넌트의 top level에서 call 해야 합니다.

# useState

useState는 컴포넌트의 [state](https://react.dev/learn/state-a-components-memory)를 추가할 수 있게 해주는 React의 Hook입니다. 기본 형태는 아래와 같습니다.

```jsx
const [something, setSomething] = useState(initialState);
```

>set function이란 위의 예시에서 setSomthing처럼 useState의 return값을 의미합니다. 이 함수는 state를 업데이트 시켜주고 리랜더링을 트리거 합니다. 

## 📌 useState Deep Dive
### 1️⃣ set function은 반드시! 다음 랜더에 state를 업데이트 해줍니다. 
만약에 같은 set function에서 state를 읽으려고 한다면 방금 업데이트 한 값이 아닌 이전 값이 읽어지게 됩니다. 그 이유는 react는 set function을 모든 이벤트 핸들러가 끝난후 **일괄 수행(batch)** 해주기 때문에 **이미 실행된 코드(실행 컨테스트에서 push, pop)된** 부분에서는 set 함수가 적용되지 않습니다.

```jsx
function handleClick() {
  console.log(count);  // 0

  setCount(count + 1); // Request a re-render with 1
  console.log(count);  // Still 0!

  setTimeout(() => {
    console.log(count); // Also 0!
  }, 5000);
}
```

### 2️⃣ set function 내부에서 updater funtion을 지정해주면 이전값을 반영하여 계산한다.
```jsx
function handleClick() {
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
  setAge(age + 1); // setAge(42 + 1)
}

function handleClick() {
  setAge(a => a + 1); // setAge(42 => 43)
  setAge(a => a + 1); // setAge(43 => 44)
  setAge(a => a + 1); // setAge(44 => 45)
}
```

만약 이전 state를 기반으로 set function을 업데이트 해주고 싶다면 set function **내부에 updater function을 넘겨주면 됩니다.** 보통 만약 state가 age라면 첫글자인 a를 argument 이름으로 짓는데 prevAge, prevValue 등등 맘대로 지어도 됩니다..!

> [내부 동작](https://fe-j.tistory.com/entry/setState-%ED%95%A8%EC%88%98%ED%98%95-%EC%97%85%EB%8D%B0%EC%9D%B4%ED%8A%B8%EB%A1%9C)

### 3️⃣ 만약 같은 값을 update해주면 리랜딩 되지 않습니다.
만약 Object.is 비교로 같은 값을 업데이트 해주게 되면 리액트는 최적화를 위해서 리 랜더링을 스킵합니다.

### 4️⃣ react는 state 업데이트를 일괄처리 합니다.([batch](https://react.dev/learn/queueing-a-series-of-state-updates))
리액트는 중복적인 리랜더링을 방지하기 위해서 모든 event handler가 모두 수행된 후에 set function들을 한번에 수행합니다. (만약 강제로 일찍 업데이트 해야 한다면 [flushSync](https://react.dev/reference/react-dom/flushSync)를 사용)

### 5️⃣ 렌더링 중에 상태를 업데이트 해야 하는 경우!
일반적으로 리액트에서 상태는 이벤트 핸들러나 라이프사이클 메소드를 통해 이루어집니다. 그런데 어떠한 상황에서는 랜더링 중에 상태를 업데이트 해야 하는 경우가 존재합니다.

그 대표적인 예시로 props에 넘어온 값을 상태로 업데이트 해주어야 하는 경우입니다. 이러한 경우 현재 넘어온 props와 현재의 state값을 비교하여 다른 경우(상태를 추척)에 상태를 업데이트 해줍니다. 
```jsx
import { useState } from 'react';

function CounterDisplay({ count }) {
  const [prevCount, setPrevCount] = useState(0);

  if (prevCount !== count) {
    setPrevCount(count);
    console.log(`Count changed from ${prevCount} to ${count}`);
  }

  return <div>{count}</div>;
}

```

이렇게 동작할때에는 React는 해당 컴포넌트의 랜더링을 즉시 취소하고 새로운 상태로 다시 랜더링을 합니다. 그래서 두 번의 완전한 렌더링이 발생하는 것이 아니라, 렌더링이 중간에 중단되고 다시 시작되는 형태입니다.

여기서 주의해야 할 점은 이 패턴이 오동작하거나 무한 루프에 빠질 수 있는 상황이 발생할 수 있으므로, 사용 시에는 신중해야 합니다. 이 패턴은 특별한 상황에서만 필요하며, 일반적인 경우에는 피하는 것이 좋습니다.

### 6️⃣ 무한 로딩 될 수 있는 코드
```jsx
const Example = () => {
	const [value, setValue] = useState(0);
  
  	const sayHello = () => {
    	console.log('hello');
      	setValue(value+1);
    }
    
    sayHello();
  	return (
      <div>
        <h1>value: {value}</h1>
      </div>
    ); 
};

export default Example;
```

example component내부에서 sayHello함수가 실행되는데 이 함수는 리랜더링 될때마다 실행이 됩니다. 그리고 setState는 리랜더링을 트리거합니다. 따라서 랜더링 될때마다 호출되는 sayHello 내부에 랜더링을 트리거 하는 set function이 존재하면 무한 루프에 빠지게 됩니다.


> 결론적으로 useState를 사용할때 신경써야할 부분을 정리해보면 아래와 같다
> 1. Object.is 비교시 같으면 리랜더링이 안된다.
> 2. set function 내부에서 즉각적으로 상태를 반영해야 한다면 콜백 함수로 작성한다.
> 3. 무한 루프에 빠지지 않도록 주의한다








