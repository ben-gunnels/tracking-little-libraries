export default function AboutPage() {
    return (
      <div className="min-h-screen bg-white text-gray-800 px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 border-b pb-2 border-gray-300">About Us</h1>
  
          <p className="mb-6 text-lg leading-relaxed">
            Welcome to <span className="font-semibold text-blue-600">Tracking Little Libraries</span> — a
            community-powered platform dedicated to mapping and celebrating small, free libraries around the world.
          </p>
  
          <h2 className="text-2xl font-semibold mb-3">Our Mission</h2>
          <p className="mb-6 text-md leading-relaxed">
            We want to uncover the little libraries all around us, making reading more accessible for everyone.
            Our goal is to make it easy for people to discover and contribute to little libraries in their
            neighborhoods. We believe in the power of books, accessibility, and community engagement.
          </p>
  
          <h2 className="text-2xl font-semibold mb-3">Who We Are</h2>
          <p className="mb-6 text-md leading-relaxed">
            We're a small team of developers, and book lovers who wanted to create a simple tool
            for sharing these amazing grassroots book exchanges. If you spot a library we haven't mapped — you
            can help us grow!
          </p>
  
          <h2 className="text-2xl font-semibold mb-3">Contact Us</h2>
          <p className="mb-6 text-md leading-relaxed">
            Want to add your little library to our database? Send an email to
            <a href="mailto:trackinglittlelibraries@gmail.com" className="text-blue-600 underline">
              trackinglittlelibraries@gmail.com
            </a>.
            and you will receive a qr code with a one time use token which can be used to add the location of your library to our network. 
          </p>
        </div>
      </div>
    );
  }