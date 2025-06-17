
import Image from "next/image";
import Link from "next/link";
import React, { ReactNode } from "react";

const rootLayout = ({ children } : { children: React.ReactNode }) => {
  return (
    <div className="root-layout">
      <nav>
        <Link href="/" className="flex items-center gap-2">
          <Image src="/logo.svg" alt="Logo" width={38} height={32} />
          <h2 className="text-2xl font-bold text-orange-200 ">LeveLPrep</h2>
        </Link>
      </nav>
      {children}
    </div>
  )
}

export default rootLayout
