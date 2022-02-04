### 7 The Big Difference with Props

Мы апісваем інтэрфейс для Чайлда, якія пропсы ён можа атрымаць ад Пэрэнта.

```
interface ChildProps {
  color: string
}
```

Гэта дае 2 **ВЯЛІКІХ** праверкі:

1. Ці мы забяспечваем правільныя прапсы для Чайлда калі паказваем яго Пэрэнту? (парэнт)
2. Ці карыстаемся мы правільнымі імёнамі і правільным тыпамі у самім Чайлдзе? (сам чайлд)

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

### 10. State with TypeScript

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

### 13. More on State

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

## 18. TypeScript with Class Components

```
interface User {
  name: string;
  age: number;
};

interface UserSearchProps { // for array of users
  users: User[]
};

interface UserSearchState {
  name: string;
  user: User | undefinded
}

class UserSearch extends Component<UserSearchProps> {
  state:UserSearchState = {
    name: '',
    user: undefined
  };

  onClick = () => {
    const foundUser = this.props.users.find(user => user.name === this.state.name)
    this.setState({user:foundUser});
  }

  render () {
    const {name} = this.state;
    return (
      <>
      <h3> User Search</h3>
      <input value={name} onChange={(e)=> this.setState({name: e.target.value})}/>
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
    )
  }
```

## Section 4: Typescript with Redux ##
### Links to NPM SEARCH API ###
- [Old one](https://registry.npmjs.org/-/v1/search?text=react)
- [New one](https://api.npms.io/v2/search?q=react)  
  
We need to know what our state will be. 
Here we have 3 fields from 1 main:  
`repositories: 1 - data, 2 - loading, 3 - error.`
So reducer may look like this:
```
interFace RepositoriesState {
  loading: boolean;
  error: string | null;
  data: strings[] //just for now
}

const reducer = (state:RepositoriesState, action: any) => {
  switch (action.type) {
    case 'SEARCH_REPOSITORIES':
      return {loading: true, error: null, data: []}
    case 'SEARCH_REPOSITORIES_SUCCESS':
      return {loading: false, error: null, data: action.payload}
    case 'SEARCH_REPOSITORIES_ERROR':
      return {loading: false, error: action.payload, data: []}
    default: 
      return state;
  }
}
```

Зараз мы можам зрабіць так, каб ТС правяраў тое, што вяртаецца з рэдзьюсэра. Тым самым мы забяспечым бяспеку для `data`.
```
const reducer = (state:RepositariesState, action: any):RepositariesState{...}
```
Трэба таксама правяраць і Экшн. Спачатку проста праверым тайп, а ўдасканалім пэйлоад пасля.
```
interface Action {
  type: string;
  payload?: any
}
```
У нас ёсць 3 віды экшэнаў і таму для кожнага мы прапішам свой інтэрфейс. 

```
interface SearchRepositoriesAction {
  type: 'SEARCH_REPOSITORIES';
}

interface SearchRepositoryActionSuccess {
  type: 'SEARCH_REPOSITORIES_SUCCESS';
  payload: string[];
}

interface SearchRepositoriesError {
  type: 'SEARCH_REPOSITORIES_ERROR';
  payload: string;
}
```
І перадаючы ў рэдзьюсэр мы прапісваем праз пайп усе магчымыя тыпы экшенаў.  
```
const reducer = (state:RepositoriesState, action: 
  SearchRepositories 
  | SearchRepositoriesSuccess 
  | SearchRepositoriesError
): RepositariesState {...}
```

Аб'яднаем усе экшэны ў адзін `Action`
```
type Action =  SearchRepositories 
  | SearchRepositoriesSuccess 
  | SearchRepositoriesError
```
Такім чынам `action:Action`  
Таксама вынясем усе гэтыя радкі з тыпамі экшэнаў у `enum` і перавядзем тыя радкі ў спасылку на enum.
```
enum ActionType {
  SEARCH_REPOSITORIES = 'SEARCH_REPOSOTORIES',
  SEARCH_REPOSITORIES_SUCCESS = 'SEARCH_REPOSOTORIES_SUCCESS',
  SEARCH_REPOSITORIES_ERROR = 'SEARCH_REPOSOTORIES_ERROR',
}
```
Уладкуем нашую структуру тэчак лепшым чынам:
- усе interface вынясем у `actions=>index.ts`. Экспартуем `type Action`;
- вынясем `enum` у `action-types=>index.ts` і экспартуем яго ж.
- Імпартуем `Action` і `ActionType` у redux.ts

Зробім тэчку з экшн-кріэйтарамі `action-creators => index.ts`;

