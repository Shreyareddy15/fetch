import React, { useState } from 'react';
import axios from 'axios';

const Login = () => {
    const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://frontend-take-home-service.fetch.com/auth/login', {
        name,
        email
      });
      console.log('Login successful. Access token:', response.data);
      const d=await axios.get('https://frontend-take-home-service.fetch.com/dogs/breeds',{
        withCredentials :true,
      });
    console.log("response data",d.data)
      //window.location.href = '/search';
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
        <br />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;



// import React, { useState } from 'react';
// import axios from 'axios';

// const Login = () => {
//   const [name, setName] = useState('');
//   const [email, setEmail] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {

//       const response = await axios.post('https://frontend-take-home-service.fetch.com/auth/login', {
//         name,
//         email,
//       }, {
//         headers: {
//           withCredientials: true
//         },
//       });

//       console.log('Login Response:', response);
//   window.location.href = '/search';
//     } catch (error) {
//       console.error('Login failed:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <label>
//           Name:
//           <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
//         </label>
//         <br />
//         <label>
//           Email:
//           <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
//         </label>
//         <br />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default Login;
