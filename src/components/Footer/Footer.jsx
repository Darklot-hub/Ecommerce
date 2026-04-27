import styles from "./Footer.module.css";
import Modal from "../Modal/Modal";
import { useState } from "react";

function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <footer className={styles.footer}>
      <div className={styles.footerColumns}>
        <div className={styles.col}>
          <h4>About TechStore</h4>
          <p>
            Premium electronics store offering the latest technology with
            exceptional customer service since 2026.
          </p>
        </div>

        <div className={styles.col}>
          <h4>Support</h4>
          <a href="#">FAQ</a>
          <a href="#">Shipping Info</a>
          <a href="#">Returns Policy</a>
          <a href="#">Contact Us</a>
        </div>

        <div className={styles.col}>
          <h4>Legal</h4>
          <a href="#">Privacy Policy</a>
          <a href="#">Terms of Service</a>
          <a href="#">Cookie Policy</a>
        </div>

        <div className={styles.col}>
          <h4>Newsletter</h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Your email address"
              className={styles.newsletterInput}
            />
            <button type="submit" className={styles.subscribeBtn}>
              Subscribe
            </button>
          </form>
        </div>
        <div className={styles.col}>
          <h4>Info</h4>
          <button
            onClick={() => setIsModalOpen(true)}
            className={styles.modalTrigger}
          >
            О проекте
          </button>
        </div>
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <h2>О TechStore</h2>
          <p>
            Интерактивный каталог электроники, выполненный в рамках тестового
            задания.
          </p>
          <p>Используются: React, Vite, CSS Modules, OpenWeatherMap API.</p>
        </Modal>
      </div>

      <div className={styles.copyright}>
        © 2026 TechStore. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
