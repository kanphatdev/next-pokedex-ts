"use client";

import { LayoutGrid, List, Package2 } from "lucide-react";
import Link from "next/link";
import React from "react";
import pokemonTypes from "../data/pokemonTypes";

type BaseLayoutProps = {
  children: React.ReactNode;
};

const BaseLayout = ({ children }: BaseLayoutProps) => {
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />

      <div className="drawer-content">
        <div className="navbar bg-base-300 w-full bg-blend-soft-light flex items-center justify-between px-4">
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
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </label>
          </div>

          <div className="flex-1 flex justify-center">
            <label className="input flex items-center w-full max-w-md">
              <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                  <circle cx="11" cy="11" r="8"></circle>
                  <path d="m21 21-4.3-4.3"></path>
                </g>
              </svg>
              <input type="search" className="grow px-2" placeholder="Search" />
            </label>
          </div>

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

            {/* Dropdown for Pokémon Types */}
            <details className="dropdown">
              <summary className="btn btn-dash btn-success capitalize">
                Poke Elements
              </summary>
              <ul className="menu dropdown-content bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                {pokemonTypes.map((type, index) => (
                  <li key={index}>
                    <a className={`capitalize`} href={`/elements/${type.name}`}>{type.name}</a>
                  </li>
                ))}
              </ul>
            </details>

            <div className="indicator">
              <label htmlFor="my-drawer" className="btn btn-primary btn-soft drawer-button">
                <span className="indicator-item badge badge-soft badge-secondary">12</span>
                <Package2 />
              </label>
            </div>

            <label className="swap swap-rotate">
              <input type="checkbox" className="theme-controller" value="dark" />
              <svg className="swap-off h-10 w-10 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
              </svg>
            </label>
          </div>
        </div>

        {children}
      </div>

      <div className="drawer-side">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <div className="menu bg-base-200 text-base-content min-h-full w-80 p-4"></div>
      </div>
    </div>
  );
};

export default BaseLayout;
