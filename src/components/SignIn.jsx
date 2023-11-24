const SignIn = () => {
  return (
    <div className="container h-full bg-white flex items-center justify-center flex-col py-2 w-1/2 mx-auto">
      <img src="./imgs/person-2.png" alt="person" />

      <button
        className="bg-blue text-white mt-2 py-2 px-4 rounded-sm w-32"
        onClick={this.handleClick}
      >
        Log In
      </button>
    </div>
  );
};

export default SignIn;
