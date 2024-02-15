"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const ProductPageImage = ({ img, name }: { img: string; name: string }) => {
  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="h-[270px] md:h-[400px] shadow-product-card rounded-[8px] overflow-hidden mx-auto"
    >
      <Image
        src={`/images/${img}`}
        alt={name}
        width={300}
        height={300}
        className="h-full w-auto object-cover"
      />
    </motion.div>
  );
};
export default ProductPageImage;
