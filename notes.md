### 7 The Big Difference with Props ###  


Мы апісваем інтэрфейс для Чайлда, якія пропсы ён  можа атрымаць ад Пэрэнта.
```
interface ChildProps {
  color: string
}
```
Гэта дае 2 **ВЯЛІКІХ** праверкі:
1) Ці мы забяспечваем правільныя прапсы для Чайлда калі паказваем яго Пэрэнту? (парэнт)
2) Ці карыстаемся мы правільнымі імёнамі і правільным тыпамі у самім Чайлдзе? (сам чайлд)

```
const Child (props: ChildProps) => { // or ({color}: ChildProps)
  return <h2> {props.color}</h2> // or just {color}
}
```
Але з гэтым падыходам ТС не разумее, што мы ствараем РЭАКТ кампанент. Ён толькі бачыць функцыю з аргументам вызначанага тыпу.
Бо напрыклад рэакт кампанент можа па-змоўчанні атрымліваць наступныя прапсы:
- propTypes
- displayName
- defaultProps
- contextTypes
  
І ТС пра іх ня ведае. Каб ведаў можна скарыстацца наступным падыходам:
```
const ChildAsFC: React.FC<ChildProps> = ({color}) => {
  retutn <div>{color}</div>
}
```
Таксама мы можам перадаць нейкі хэндлер, каб апрацаваць клік. І там, і там ён будзе працаваць, калі мы прапішам у ChildProps тое, што Чайлд мусіць атрымаць функцыю.
```
interface ChildProps {
  color: string;
  onClick: () => void //new prop
}
```
```
const Child ({color, onClick}){
  ...
}
```
Але праблема з гэтым падыходам у тым, што пры такім абвяшчэнні мы не можам перадаць туды **children**.
У другім падыходзе можам.
```
const ChildAsFC: React.FC<ChildProps> = ({color, onCLick}) => {
  return (
    <div>
      {color}
      <button>Click me</button>
      {children}
    </div>
  )
}
```
У той час як у Parent: 
```
const Parent = () => {
  return (
   <div>
      <p>
        I'm parent
      </p>
      <Child color='red' onClick={()=> {console.log('clicked')}}> I'm child </Child>
   </div>
  )
}
```
### 10. State with TypeScript ###
Will create GuestList component and import it to App to render and see what is going on

```
const GuestList:React.FC = () => {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState<string[]>([]); 
  // <string[]> important to show TS that it will be array of strings otherwise it will think that it's an empty array with 'never' type

  const onClick = () => {
    setName('');
    setGuests([...guests, name])
  };

  return (
    <div>
      <h1>
        Guest List
      </h1>
      <ul>
        {guests.map(guest => (
          <li key={guest}>{guest}</li>
        ))}
      </ul>
      <input value={name} onChange={(e)=> setName(e.target.value)}>
      <button onClick={onClick}>Add Guest</button>
    </div>
  );
};
```

### 13. More on State ###
UserSearch component.

```
const users = [
  {name: 'Paval', age: 36},
  {name: 'Nadzeya', age: 37},
  {name: 'Uladzislau', age: 12},
  {name: 'Tadevush', age: 6},
  {name: 'Maciej', age: 4},
];

  const UserSearch: React.FC = () => {
    const [name, setName] = useState('');
    const [user, setUser] = useState<{name:string; age: number} | undefined>();
    const onClick = () => {
      const foundUser = users.find(user => user.name === name)
      setUser(foundUser);
    };

    return (
      <>
        <h3> User Search</h3>
        <input value={name} onChange={(e)=> setName(e.target.value)}/>
        <button onClick={onClick}> Find User</button>
        {user ? (
          <>
            <p>
              user name: {user.name}
            </p>
            <p>
              user age: {user.age}
            </p>
          </>
        ): <p>Nothing found</p>}
      </>
    );
  };
```