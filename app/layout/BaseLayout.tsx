"use client"; // ใช้ใน Next.js App Router (ถ้าจำเป็น)

import { LayoutGrid, List, Package2 } from "lucide-react";
import Link from "next/link";
import React from "react";

type BaseLayoutProps = {
  children: React.ReactNode;
};

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="drawer">
      {/* Checkbox toggle for drawer */}
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      {/* Main content */}
      <div className="drawer-content">
        <div className="navbar bg-amber-200/15 w-full bg-blend-soft-light flex items-center justify-between px-4">
          {/* Sidebar toggle button for mobile */}
          <div className="flex-none lg:hidden">
            <label
              htmlFor="my-drawer"
              aria-label="open sidebar"
              className="btn btn-square btn-ghost"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-6 w-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>

          {/* Centered Search Input */}
          <div className="flex-1 flex justify-center">
            <label className="input flex items-center w-full max-w-md">
              <svg
                className="h-[1em] opacity-50"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                <g
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="2.5"
                  fill="none"
                  stroke="currentColor"
                >
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input type="search" className="grow px-2" placeholder="Search" />
            </label>
          </div>

          {/* Navigation menu (desktop only) */}
          <div className="hidden lg:flex items-center gap-2">
            <Link href="/grid">
              <button className="btn btn-soft btn-accent capitalize">
                Grid <LayoutGrid />
              </button>
            </Link>

            <Link href="/list">
              <button className="btn btn-soft btn-warning capitalize">
                List <List />
              </button>
            </Link>

            <details className="dropdown">
              <summary className="btn btn-dash btn-success capitalize">
                Poke Elements
              </summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                <li>
                  <a>Item 1</a>
                </li>
                <li>
                  <a>Item 2</a>
                </li>
              </ul>
            </details>

            {/* Cart / Indicator */}
            <div className="indicator">
              <label
                htmlFor="my-drawer"
                className="btn btn-primary btn-soft drawer-button"
              >
                <span className="indicator-item badge badge-soft badge-secondary">
                  12
                </span>
                <Package2 />
              </label>
            </div>
          </div>
        </div>

        {children}
      </div>

      {/* Sidebar */}
      <div className="drawer-side">
        <label
          htmlFor="my-drawer"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4"></div>
      </div>
    </div>
  );
};

export default BaseLayout;
