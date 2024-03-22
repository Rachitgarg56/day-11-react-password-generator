
import { useCallback, useRef, useState } from 'react';
import './App.css';
import copyIcon from './assets/copy-icon-25.png';

function App() {

  const [generatedPassword,setGeneratedPassword] = useState('');

  const inputRef = useRef('');

  const check1Ref = useRef('');
  const check2Ref = useRef(''); 
  const check3Ref = useRef('');
  const check4Ref = useRef('');

  const handleSubmit = () => {

    const passwordLength = parseInt(inputRef.current.value);

    if (passwordLength >= 8 && passwordLength <= 50) {

      const uppercase = check1Ref.current.checked;
      const lowerCase = check2Ref.current.checked;
      const numbers = check3Ref.current.checked;
      const symbols = check4Ref.current.checked;
      
      if (uppercase || lowerCase || numbers || symbols) {
        const password = generatePassword(uppercase,lowerCase,numbers,symbols);
        setGeneratedPassword(password);
      } else {
        alert("--All checkboxes are empty--");
      }

    } else {
      alert('Password length not in given range :(');
    }

  }

  const generatePassword = (upperCase,lowerCase,numbers,symbols) => {

    let arr = [];
   
    let eleNo = 0;

    const passwordLength = parseInt(inputRef.current.value);
    
    while (eleNo < passwordLength) {

      if(upperCase) {
        const randomNumber = Math.floor(Math.random() * 26);
        const randomUppercaseLetter = String.fromCharCode(65 + randomNumber);
        arr.push(randomUppercaseLetter);
        eleNo++;
      }
      if (eleNo > passwordLength-1) break;

      if(lowerCase) {
        const randomNumber = Math.floor(Math.random() * 26);
        const randomLowercaseLetter = String.fromCharCode(65 + randomNumber).toLowerCase();
        arr.push(randomLowercaseLetter)
        eleNo++;
      }
      if (eleNo > passwordLength-1) break;

      if(numbers) {
        const random = Math.random();
        const randomDigit = Math.floor(random*10);
        arr.push(randomDigit);
        eleNo++;
      }
      if (eleNo > passwordLength-1) break;

      if(symbols) {
        const symbols = ['!', '@', '#', '$', '%','&','?'];
        const randomIndex = Math.floor(Math.random() * symbols.length);
        const randomSymbol = symbols[randomIndex];
        arr.push(randomSymbol);
        eleNo++;
      }

    }

    return arr.join('');
    // outputRef.current.value = arr.join('')

  }

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPassword);
    alert('Password copied :)');
  }

  return (

    <section className='w-full min-h-screen py-8 px-4'>

      <h1 className='text-center text-3xl font-bold mb-8'>Password Generator</h1>

      <div className='container flex flex-col max-w-full gap-12'>

        <form className='flex gap-2 w-full'>
          <input value={generatedPassword} type='text' name='password' id='password' className='border border-solid border-gray-400 bg-gray-50 w-full'></input>
          <button type='button' className='w-10 h-10' onClick={handleCopy}>
            <img alt='' src={copyIcon} className='w-full' />
          </button>
        </form>

        <div className='flex flex-col self-start gap-4 sm:flex-row'>
          <label>Select Password Length<strong>(**8-50 characters**)</strong></label>
          <input ref={inputRef} type='number' name='length-of-password' id='length-of-password' className='border border-solid border-black'></input>
        </div>

        <div className='boxes flex flex-col gap-2'>
          <div className='boxes-input flex items-center gap-2'>
              <input type='checkbox' defaultChecked ref={check1Ref} />
              <label>Include upper case</label>
          </div>
          <div className='boxes-input flex items-center gap-2'>
              <input type='checkbox' defaultChecked ref={check2Ref} />
              <label>Include lower case</label>
          </div>
          <div className='boxes-input flex items-center gap-2'>
              <input type='checkbox' defaultChecked ref={check3Ref} />
              <label>Include numbers</label>
          </div>
          <div className='boxes-input flex items-center gap-2'>
              <input type='checkbox' defaultChecked ref={check4Ref} />
              <label>Include symbols</label>
          </div>
        </div>

        <button type='submit' onClick={handleSubmit} className=' rounded-md py-2 px-4 bg-blue-500 hover:bg-green-500 text-white'>Generate Password</button>

      </div>
      
    </section>

  )

}

export default App;
