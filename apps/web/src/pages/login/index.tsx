import { Navigate } from '@solidjs/router';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'solid-icons/ai';
import { Component, createSignal, Show } from 'solid-js';
import TextField from '../../components/TextField';
import { useAuth } from '../../context/Auth';

const Login: Component = () => {
  const [{ isAuthenticated }, { login }] = useAuth();

  const [passwordVisibility, setPasswordVisibility] = createSignal(false);
  const [data, setData] = createSignal({ email: '', password: '' });

  const handleLogin = async () => {
    const { email, password } = data();

    await login(email, password);
  };

  return isAuthenticated ? (
    <Navigate href="/" />
  ) : (
    <div class="bg-[#ecf0f5] flex flex-col justify-center items-center h-screen mx-auto">
      <div>
        <p class="mb-3 text-4xl font-bold text-blue-700/90">
          Pass<span class="text-slate-800">Vault</span>
        </p>
        <p class="text-xl text-slate-800">
          Log in to access your secure vault.
        </p>
      </div>
      <div class="w-[400px] bg-white p-5 rounded border border-gray-300 border-solid my-10">
        <div class="flex flex-col space-y-4">
          <TextField
            id="email"
            type="email"
            label="Email Address"
            value={data().email}
            onInput={(e) =>
              setData((prev) => ({ ...prev, email: e.currentTarget.value }))
            }
          />
          <TextField
            type={passwordVisibility() ? 'text' : 'password'}
            label="Password"
            id="password"
            value={data().password}
            onInput={(e) =>
              setData((prev) => ({ ...prev, password: e.currentTarget.value }))
            }
            suffix={
              <Show
                when={passwordVisibility()}
                fallback={
                  <AiOutlineEye
                    onClick={() => setPasswordVisibility((prev) => !prev)}
                  />
                }
              >
                <AiOutlineEyeInvisible
                  onClick={() => setPasswordVisibility((prev) => !prev)}
                />
              </Show>
            }
          />
        </div>
        <div class="flex flex-row-reverse justify-end">
          <label for="remember" class="cursor-pointer">
            Remember Email
          </label>
          <input
            type="checkbox"
            class="mr-2 w-4 cursor-pointer"
            id="remember"
          />
        </div>
        <hr class="bg-gray-300 h-[1px] border-none my-4" />
        <button
          class="w-full border-none text-lg p-2 text-white bg-blue-700/90 rounded font-semibold"
          onClick={() => handleLogin()}
        >
          Login
        </button>
      </div>
      <div class="text-slate-500">
        <p>© 2022 PassVault Inc.</p>
        <p>Version 2022.8.1</p>
      </div>
    </div>
  );
};

export default Login;
