import React from "react";
import landingImage from "../images/landing.png";
import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="flex min-h-[100dvh] flex-col bg-background">
      <header className="sticky top-0 z-50 bg-background">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8"></div>
      </header>
      <main className="flex-1">
        <section className="bg-gradient-to-r from-primary to-primary-foreground py-20 text-primary-foreground">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                  Effortless File Management
                </h1>
                <p className="text-lg">
                  Streamline your workflow with our powerful file manager.
                  Store, share, and collaborate on files securely in the cloud.
                </p>
                <div className="flex gap-4">
                  <Link
                    to="/login"
                    className=" text-white text-lg mt-4 font-semibold p-4 rounded-full transition-colors"
                    style={{ backgroundColor: "#2384c0" }}
                  >
                    Get Started
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src={landingImage}
                  width={600}
                  height={400}
                  alt="File Manager"
                  className="rounded-lg"
                  style={{ aspectRatio: "500/400", objectFit: "cover" }}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="space-y-4">
                <CloudIcon className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">Cloud Storage</h3>
                <p>
                  Store your files securely in the cloud and access them from
                  anywhere.
                </p>
              </div>
              <div className="space-y-4">
                <FileIcon className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">File Management</h3>
                <p>Easily manage files with your team and working partners.</p>
              </div>
              <div className="space-y-4">
                <CombineIcon className="h-12 w-12 text-primary" />
                <h3 className="text-2xl font-bold">Collaboration</h3>
                <p>
                  Work together on files in real-time with built-in
                  collaboration tools.
                </p>
              </div>
            </div>
          </div>
        </section>
        {/* <section className="bg-muted py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold">What Our Customers Say</h2>
                <p className="mt-4 text-muted-foreground">
                  Hear from our satisfied customers about their experience with
                  our file manager.
                </p>
              </div>
              <div className="space-y-6">
                <div className="rounded-lg bg-background p-6 shadow">
                  <blockquote>
                    <p className="text-lg font-medium">
                      "The file manager has been a game-changer for our team.\n
                      It's easy to use and has streamlined our collaboration\n
                      process."
                    </p>
                    <cite className="mt-4 block text-sm font-medium not-italic text-muted-foreground">
                      - John Doe, Project Manager
                    </cite>
                  </blockquote>
                </div>
                <div className="rounded-lg bg-background p-6 shadow">
                  <blockquote>
                    <p className="text-lg font-medium">
                      "I love how I can access my files from anywhere and
                      share\n them with my team. The file manager has made my
                      life so\n much easier."
                    </p>
                    <cite className="mt-4 block text-sm font-medium not-italic text-muted-foreground">
                      - Jane Smith, Freelance Designer
                    </cite>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section> */}
        {/* <section className="py-20">
          <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold">Pricing</h2>
                <p className="mt-4 text-muted-foreground">
                  Choose the plan that best fits your needs.
                </p>
              </div>
              <div className="space-y-6">
                <div className="rounded-lg bg-background p-6 shadow">
                  <h3 className="text-2xl font-bold">Free</h3>
                  <p className="mt-2 text-4xl font-bold">$0</p>
                  <p className="mt-4 text-muted-foreground">
                    Perfect for individuals and small teams.
                  </p>
                  <ul className="mt-6 space-y-2 text-muted-foreground">
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4" />5 GB
                      storage
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4" />
                      Basic file sharing
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4" />
                      Limited collaboration tools
                    </li>
                  </ul>
                  <button className="mt-6">Sign Up</button>
                </div>
                <div className="rounded-lg bg-background p-6 shadow">
                  <h3 className="text-2xl font-bold">Pro</h3>
                  <p className="mt-2 text-4xl font-bold">$9/month</p>
                  <p className="mt-4 text-muted-foreground">
                    Ideal for teams and businesses.
                  </p>
                  <ul className="mt-6 space-y-2 text-muted-foreground">
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4" />
                      50 GB storage
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4" />
                      Advanced file sharing
                    </li>
                    <li>
                      <CheckIcon className="mr-2 inline-block h-4 w-4" />
                      Comprehensive collaboration tools
                    </li>
                  </ul>
                  <button className="mt-6">Get Started</button>
                </div>
              </div>
            </div>
          </div>
        </section> */}
      </main>
      <footer className="bg-muted py-10">
        <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mt-8 border-t border-muted pt-4 text-center text-muted-foreground">
            <p>&copy; 2024 File Manager. All rights reserved.</p>
            <span>Made with 🩷 by </span>
            <Link
              to="https://gauravgarwa.vercel.app"
              target="_blank"
              className="text-blue-500"
            >
              {" "}
              Gaurav
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

function CloudIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
    </svg>
  );
}

function CombineIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="8" x="2" y="2" rx="2" />
      <path d="M14 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
      <path d="M20 2c1.1 0 2 .9 2 2v4c0 1.1-.9 2-2 2" />
      <path d="M10 18H5c-1.7 0-3-1.3-3-3v-1" />
      <polyline points="7 21 10 18 7 15" />
      <rect width="8" height="8" x="14" y="14" rx="2" />
    </svg>
  );
}

function FileIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    </svg>
  );
}
