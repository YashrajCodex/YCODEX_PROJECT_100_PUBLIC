
import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Key, Popcorn, ArrowRight } from 'lucide-react';
import Navbar from '../components/multiutils/reusable/Navbar';
import Footer from '../components/multiutils/reusable/Footer';

const Home: React.FC = () => {
  const utilities = [
    {
      title: 'Text Utils',
      description: 'Transform and manipulate text with various utilities like case conversion, find & replace, and more.',
      icon: FileText,
      path: '/text_utils',
      color: 'bg-blue-500'
    },
    {
      title: 'Password Generator',
      description: 'Generate secure passwords with customizable options for length, characters, and complexity.',
      icon: Key,
      path: '/password_generator',
      color: 'bg-green-500'
    },
    {
      title: 'Popcorn',
      description: 'Discover and explore movies and web series with detailed information and ratings.',
      icon: Popcorn,
      path: '/popcorn',
      color: 'bg-red-500'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar title="MultiUtils" />
      
      {/* Hero Section */}
      <section className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
              Welcome to <span className="text-primary">MultiUtils</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Your one-stop destination for essential utilities. From text manipulation to password generation,
              we've got all the tools you need in one convenient place.
            </p>
          </div>

          {/* Utilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {utilities.map((utility) => (
              <Link
                key={utility.path}
                to={utility.path}
                className="group bg-card border border-border rounded-xl p-8 hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                <div className={`w-16 h-16 ${utility.color} rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <utility.icon size={32} className="text-white" />
                </div>
                <h3 className="text-2xl font-semibold text-card-foreground mb-4">{utility.title}</h3>
                <p className="text-muted-foreground mb-6">{utility.description}</p>
                <div className="flex items-center text-primary group-hover:translate-x-2 transition-transform">
                  <span className="mr-2">Get Started</span>
                  <ArrowRight size={18} />
                </div>
              </Link>
            ))}
          </div>

          {/* Features Section */}
          <div className="bg-accent rounded-2xl p-8 lg:p-12">
            <h2 className="text-3xl font-bold text-accent-foreground text-center mb-8">
              Why Choose MultiUtils?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold text-accent-foreground mb-2">All-in-One</h3>
                <p className="text-muted-foreground">Multiple utilities in a single, convenient platform.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold text-accent-foreground mb-2">User-Friendly</h3>
                <p className="text-muted-foreground">Intuitive interface designed for ease of use.</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-primary rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold text-accent-foreground mb-2">Fast & Reliable</h3>
                <p className="text-muted-foreground">Quick processing with consistent performance.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
