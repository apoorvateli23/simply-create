import { useNavigate } from 'react-router-dom';
import HeroSection from '@/components/landing/HeroSection';

const Index = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/create');
  };

  return (
    <div className="min-h-screen">
      <HeroSection onGetStarted={handleGetStarted} />
    </div>
  );
};

export default Index;
