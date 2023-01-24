# React 
- ## Components in react:
    Components are the core of React. Everything in React is a component.<br>There are two ways to create a React component:

    **1) Stateless Functional Component** :- 
    - To create a component with a function, you simply write a JavaScript function that returns either JSX or null.
    - One important thing to note is that React requires your function name to begin with a capital letter. 
    
            const MyComponent = function() {
                // Change code below this line
                return (
                    <div>
                        <p>This is some text to return.</p>
                    </div>
                );
                // Change code above this line
            }
    **2) Class Component** :-
    -  In the following example, ``Kitten`` extends ``React.Component``:

            class Kitten extends React.Component {
                constructor(props) {
                    super(props);
                }

                render() {
                    return (
                    <h1>Hi</h1>
                    );
                }
            }
    - the Kitten class now has access to many useful React features, such as local state and lifecycle hooks.
    - Kitten class has a constructor defined within it that calls ``super()``. <br>It uses ``super()`` to call the constructor of the parent class, in this case ``React.Component``.
- ## Nesting components in react:
            return (
                <App>
                <Navbar />
                <Dashboard />
                <Footer />
                </App>
            )
- ## Rendering a React Component using ReactDOM.render():
    - Syntax: 
    
            ReactDOM.render(componentToRender, targetNode)
- ## Properties (props) in components:
            <App>
                <Welcome user='Mark' />
            </App>

    - here ``user`` is the property passed to the component ``Welcome``.
            
            const Welcome = (props) => {
                return (<h1>Hello, {props.user}!</h1>);
            }
    -  To pass an array to a JSX element, it must be treated as JavaScript and wrapped in curly braces.
    ```
        <ParentComponent>
            <ChildComponent colors={["green", "blue", "red"]} />
        </ParentComponent>
        
        // Another Example of Todo list
        const List = (props) => {
            { /* Change code below this line */ }
                return <p>{props.tasks.join(",")}</p>
            { /* Change code above this line */ }
        };

        class ToDo extends React.Component {
            constructor(props) {
                super(props);
        }
        render() {
            return (
            <div>
                <h1>To Do Lists</h1>
                <h2>Today</h2>
                { /* Change code below this line */ }
                <List tasks={["t1","t2"]}/>
                <h2>Tomorrow</h2>
                <List tasks={["t1","t2","t3"]}/>
                { /* Change code above this line */ }
            </div>
            );
        }
        };
    ```
    - To access props within a class component, you preface the code that you use to access it with ``this``.
     For example, if an ES6 class component has a prop called ``data``, you write ``{this.props.data}`` in JSX.
    - **Default Props**: 
        ```
        MyComponent.defaultProps = { location:'Francisco' }
        ```
    - **PropTypes**:
        
        ```
        MyComponent.propTypes = { handleClick: PropTypes.func.isRequired }
        ```
        this checks that handleClick is a function and it is required field.
- A stateless functional component is any function you write which accepts props and returns JSX. A stateless component, on the other hand, is a class that extends ``React.Component``, but does not use internal state (covered in the next challenge).
- Finally, a stateful component is a class component that does maintain its own internal state.

- ## State:
    - State consists of any data your application needs to know about, that can change over time.
    - You create state in a React component by declaring a ``state`` property on the component class in its ``constructor``.
    This initializes the component with ``state`` when it is created.
    - The ``state`` property must be set to a JavaScript ``object``. 
    Declaring it looks like this:
    ```
    this.state={  }
    ```
    - Note that you must create a class component by extending ``React.Component`` in order to create ``state`` like this.

    -  If a component is stateful, it will always have access to the data in ``state`` in its ``render()`` method. You can access the data with ``this.state``.
    - React uses what is called a virtual DOM, to keep track of changes behind the scenes. When state data updates, it triggers a re-render of the components using that data - including child components that received the data as a prop. React updates the actual DOM, but only where necessary. 
    - If you make a component stateful, no other components are aware of its state. Its state is completely encapsulated, or local to that component, unless you pass state data to a child component as props. This notion of encapsulated state is very important because it allows you to write certain logic, then have that logic contained and isolated in one place in your code.
- ## Updating a State:
    - React provides a method for updating component state called ``setState()``.
    - For instance, if we were storing a username in state and wanted to update it, it would look like this:
    ```
    this.setState({
        username: 'Lewis'
    });
    ```
    - In addition to setting and updating `state`, you can also **define methods for your component class**. A class method typically needs to use the ``this`` keyword so it can access properties on the class (such as ``state`` and ``props``) inside the scope of the method. There are a few ways to allow your class methods to access ``this``.
    - One common way is to explicitly bind ``this`` in the constructor so ``this`` becomes bound to the class methods when the component is initialized. You may have noticed the last challenge used ``this.handleClick = this.handleClick.bind(this)`` for its ``handleClick`` method in the constructor. Then, when you call a function like ``this.setState()`` within your class method, ``this`` refers to the class and will not be ``undefined``.
    <br><br>
    - Sometimes you might need to know the previous ``state`` when updating the ``state``. However, ``state`` updates may be asynchronous - this means React may batch multiple ``setState()`` calls into a single update. This means you can't rely on the previous value of ``this.state`` or ``this.props`` when calculating the next value. So, you should not use code like this:
    ```
    this.setState({
  counter: this.state.counter + this.props.increment
    });
    ```
    - Instead, you should pass ``setState`` a function that allows you to access ``state`` and ``props``. Using a function with ``setState`` guarantees you are working with the most current values of ``state`` and ``props``. This means that the above should be rewritten as:
    ```
    this.setState((state, props) => ({
        counter: state.counter + props.increment
    }));
    ```
    - Demonstration:
    ### Visibility changer:
    ```
    class MyComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
            visibility: false
            };
            // Change code below this line
        this.toggleVisibility=this.toggleVisibility.bind(this);
            // Change code above this line
        }
        // Change code below this line
        toggleVisibility(){
            this.setState(state=>({
            visibility: !(state.visibility)
            }))
        }
        // Change code above this line
        render() {
            if (this.state.visibility) {
            return (
                <div>
                <button onClick={this.toggleVisibility}>Click Me</button>
                <h1>Now you see me!</h1>
                </div>
            );
            } else {
            return (
                <div>
                <button onClick={this.toggleVisibility}>Click Me</button>
                </div>
            );
            }
        }
    }
    ```
    ### Counter:
    ```
    class Counter extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
            count: 0
            };
            // Change code below this line
            this.increment=this.increment.bind(this);
            this.decrement=this.decrement.bind(this);
            this.reset=this.reset.bind(this);
            // Change code above this line
        }
        // Change code below this line
        increment(){
            this.setState((state)=>({count: state.count+1}));
        }
        decrement(){
            this.setState((state)=>({count: state.count-1}));
        }
        reset(){
            this.setState({count:0})
        }
        // Change code above this line
        render() {
            return (
            <div>
                <button className='inc' onClick={this.increment}>Increment!</button>
                <button className='dec' onClick={this.decrement}>Decrement!</button>
                <button className='reset' onClick={this.reset}>Reset</button>
                <h1>Current Count: {this.state.count}</h1>
            </div>
            );
        }
    };
    ```
    ### Input Controller
    ```
    class ControlledInput extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
            input: ''
            };
            // Change code below this line
            this.handleChange=this.handleChange.bind(this);
            // Change code above this line
        }
        // Change code below this line
        handleChange(event){
            // console.log(event.target.value)
            this.setState({
            input: event.target.value
            });
        }
        // Change code above this line
        render() {
            return (
            <div>
                { /* Change code below this line */}
                <input value={this.state.input} onChange={this.handleChange}/>
                { /* Change code above this line */}
                <h4>Controlled Input:</h4>
                <p>{this.state.input}</p>
            </div>
            );
        }
    };
    ```

