// To be a component in React
// 1. The first alphabet of the function name must be uppercase
// 2. Return JSX
// 3. Convention: the name of the file that holds the component
// should have the same name as the function

//  4. if the Component is in its own file, it must be
//  exported defaulty (ie. export default)
export default function Header(props) {
    // console.log(props);
    return (
      <header className="bg-primary text-white text-center py-5">
      <div className="container">
        <h1 className="display-4">{props.title}</h1>
        <p className="lead">Discover amazing products at unbeatable prices!</p>
        <a href="#" className="btn btn-light btn-lg">Shop Now</a>
      </div>
    </header>
    )
  }