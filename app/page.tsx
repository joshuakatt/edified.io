import React from 'react';
import Link from 'next/link';
import { buttonVariants } from "@/components/ui/button";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-cover bg-center bg-fixed pt-20" style={{ backgroundImage: 'url("/bg-test.avif")' }}>
      <h1 className='text-center text-6xl mb-4'>Edified.io</h1>
      <Link href='/notes' passHref className={buttonVariants({ variant: "outline" })}>Click here
      </Link>
      <p className='mt-8'>A revolutionary note taking app that enables you to give you the most productive note taking app ever</p>
    </div>
  );
};

export default Home;
