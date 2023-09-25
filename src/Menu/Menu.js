import React from 'react';
import { Link } from 'react-router-dom';

function Menu() {
    return (
      <nav
            role="navigation"
            aria-label="Main Menu"
            itemScope
            itemType="http://schema.org/SiteNavigationElement">
        <ul>
          <li><Link itemProp="url" to="/">Home</Link></li>
          <li><Link itemProp="url" to="/about">About</Link></li>
          <li><Link itemProp="url" to="/login">Login</Link></li>
          <li>
            <a href="https://google.com" target="_blank" rel="noopener noreferrer" aria-label="External link to Google">
              Google
            </a>
          </li>
          <li>
            <aside>
              <button
                id="darkModeToggle"
                aria-label="Toggle dark mode"
                aria-pressed="false"
              >
                Toggle Dark Mode
              </button>
            </aside>
          </li>
        </ul>
      </nav>
    );
  }
  

export default Menu;
