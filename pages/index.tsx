import React from 'react';

function HomePage() {
  return (
    <div className="min-h-screen w-screen bg-white flex dark:bg-black flex-col mt-navbar">
      <div className="text-terciary-100 p-5 pt-8">
        <h3 className="text-xl">Welcome!</h3>
        <div className="mt-3">
          <p>By using this app you will be able to keep track of your tasks!</p>
          <p>Authenticate to try it!</p>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
