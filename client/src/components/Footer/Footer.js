import React from 'react';
import './Footer.css'
const Footer = () => {
  return (
    <footer className="text-center bg-white">
      <div className="container pt-4">
        <section className="mb-4">
          <a
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
          >
            <i class="bi bi-facebook"></i>
          </a>

          <a
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
          >
            <i class="bi bi-twitter"></i>
          </a>

          <a
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
          >
            <i class="bi bi-google"></i>
          </a>

          <a
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
          >
           <i class="bi bi-instagram"></i>
          </a>

          <a
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
          >
           <i class="bi bi-linkedin"></i>
          </a>

          <a
            className="btn btn-link btn-floating btn-lg text-body m-1"
            href="#!"
            role="button"
          >
            <i class="bi bi-github"></i>
          </a>
        </section>
      </div>

      <div className="text-center p-3" >
        © 2024 Copyright:
        <a className="text-body" href="" >Septiyan</a>
      </div>
    </footer>
  );
};

export default Footer;
