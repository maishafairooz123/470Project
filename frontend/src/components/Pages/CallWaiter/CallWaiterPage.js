import { useNavigate} from 'react-router-dom';
import { callwaiter } from '../../../Services/userService';
import { toast } from "react-toastify";
import { useEffect } from 'react';
import { useAuth } from '../../../Hooks/useAuth'


export default function CallWaiterPage() {

  const user = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const callWaiterAndNavigate = async () => {
      try {
        const test = await callwaiter(user);
        toast.success("Waiter Notified");
        navigate('/');
      }
      catch(error) {
        console.error("Error while calling waiter", error);
        toast.error("Error calling waiter");
        navigate('/');
      }
    }
  
    callWaiterAndNavigate();
  }, [navigate]);

  return null;
}
