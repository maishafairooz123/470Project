import { useNavigate} from 'react-router-dom';
import { answerCaller } from '../../../Services/userService';
import { toast } from "react-toastify";
import { useEffect } from 'react';
import { useAuth } from '../../../Hooks/useAuth'


export default function AnswerCallerPage() {

  const user = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const answerCallerAndNavigate = async () => {
      try {
        const test = await answerCaller(user);
        toast.success("Call Answered");
        navigate('/');
      }
      catch(error) {
        console.error("Error while answering call", error);
        toast.error("Error answering call");
        navigate('/');
      }
    }
  
    answerCallerAndNavigate();
  }, [user, navigate]);

  return null;
}
