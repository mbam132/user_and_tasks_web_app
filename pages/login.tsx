import React, { SyntheticEvent, useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import PasswordInput from '../components/PasswordInput';
import useAuth from '../hooks/useAuth';
import { IUserScope, IUser } from '../utils/types';
import useThrottle from '../hooks/useThrottle';
import useOnKeyPress from '../hooks/useOnKeyPress';
import Card from '../components/Card';
import { msIntervalBetweenCalls } from '../utils/constants';
import Button from '../components/Button';

const inputWidth: string = '150px';

function LogIn() {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [inputValues, setInputValues] = useState({
    email: '',
    password: '',
  });

  const handleInputValueChange = (event) => {
    setErrorMessage('');
    setInputValues((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = async () => {
    if (inputValues.email === '' || inputValues.password === '') {
      setErrorMessage('All fields have to have a value');
      return;
    }
    setIsLoading(true);

    try {
      const loggedInUser: IUser = await login(
        inputValues.email,
        inputValues.password
      );

      setIsLoading(false);
      console.log('the user was successfully logged in');
      if (loggedInUser.authScope === IUserScope.SUPERUSER) {
        router.push('/experimenting');
      } else {
        router.push('tasks-menu');
      }
    } catch (error) {
      console.error(error.message);
      setIsLoading(false);
      setErrorMessage('There was an error login in');
    }
  };

  const { throttledCallback: throttledSubmit } = useThrottle({
    ms: msIntervalBetweenCalls,
    callback: handleSubmit,
  });

  useOnKeyPress({ keyName: 'Enter', callback: throttledSubmit });

  return (
    <div className="mt-navbar mb-[40%] p-3">
      <Head>
        <title>Login</title>
      </Head>
      <div className="mt-3 ">
        <Card title="Log in">
          {/* <div className="flex flex-col gap-y-1.5 w-fit border-primary-100 border-2 rounded-md pt-6 pb-11 px-7 items-start h-fit mx-auto mt-5"> */}
          {/* <h1 className="text-xl text-primary-100">Log in</h1> */}

          <div>
            <input
              name="email"
              type="text"
              value={inputValues.email}
              onChange={handleInputValueChange}
              placeholder="Email"
              className={`w-[${inputWidth}] p-1.5 border-gray-300 border-2 border-primary-100  focus:outline-none rounded-md`}
            />
          </div>

          <div>
            <PasswordInput
              setValue={handleInputValueChange}
              value={inputValues.password}
              inputWidth={inputWidth}
            />
          </div>

          <Button
            handleOnClick={throttledSubmit}
            width={inputWidth}
            showSpinner={isLoading}
          >
            Submit
          </Button>
          {/* </div> */}
        </Card>
        {errorMessage && (
          <p className="mt-2 text-sm text-primary-300 leading-5">
            {errorMessage}
          </p>
        )}
      </div>
    </div>
  );
}

export default LogIn;
