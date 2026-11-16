const Greeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) {
    return <h1>Good Morning</h1>;
  } else if (hour < 18) {
    return <h1>Good Afternoon</h1>;
  } else {
    return <h1>Good Evening</h1>;
  }
};

export default Greeting;
