import './styles.css'
import { Card, CardProps } from '../../components/Card'
import { useState, useEffect } from 'react';

type ProfileResponse = {
  name: string;
  avatar_url: string;
}

type User = {
  name: string;
  avatar: string;
}

export function Home() {

  const [studentName, setStudentName] = useState('');
  const [students, setStudents] = useState<CardProps[]>([]);
  const [user, setUser] = useState<User>({} as User)

  function handleAddStudent() {    
    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString('pt-br', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })
    }

    setStudents( prevState => [...prevState, newStudent] );
  }

  useEffect(()=> {
    async function fetchData() {
      const resolve = await fetch('https://api.github.com/users/lfoalves');
      const data = await resolve.json() as ProfileResponse;

      setUser({
        name: data.name,
        avatar: data.avatar_url
      })
    };

    fetchData()
    
  }, []);

  return (
    <div className='container'>
        <header>
          <h1>Lista de presença</h1>
          <div>
            <strong>{user.name}</strong>
            <img src={user.avatar} alt="Avatar do perfil do admin" />
          </div>
        </header>

        <input
          type="text"
          placeholder='Insira...'
          onChange={e => setStudentName(e.target.value)}
        />
        <button type='button' onClick={handleAddStudent}>
          Adicionar
        </button>

        {
          students.map(student => (
            <Card
              key={student.time} 
              name={student.name}
              time={student.time} 
            />
          ) )
        }
    </div>
  )
}
