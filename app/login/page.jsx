import LoginForm from '@/components/Elements/LoginForm';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export const metadata = {
  title: 'Login to Your Account - Car Listings',
  description: 'Access your account to manage your car listings. Log in to buy or sell cars seamlessly.'
};

export default async function Page() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect("/");
    return null;
  }

  return <LoginForm />;
}