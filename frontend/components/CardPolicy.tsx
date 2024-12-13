import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

export default function CardPolicy() {
  return (
    <AnimatePresence>
      <motion.div
        className='bg-body rounded-lg flex-col flex mt-[100px] text-center card-padding'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -10 }}
          className='font-bold text-secondary py-6 text-4xl'
          transition={{ duration: 1 }}
        >
          Card Policy
        </motion.h1>
        <Image
          src='/graph/membership-card.JPG'
          alt='Membership Card Illustration'
          width={1000}
          height={2000}
          className='my-6 w-full card-rounded'
        />

        <p className='flex flex-col text-left leading-relaxed text-gray-700 card-padding'>
          <strong>Gold Card Member</strong>
          <br />
          Initial top-up of $200: receive 24 servings of 285ml beer and one
          night of free accommodation (advance booking required). Redemption is
          available from Tuesday to Thursday, limited to one serving per day.
          Beer and accommodation must be redeemed within 6 months. Gold Card
          members enjoy a 5% discount. The membership card is valid for 1 year.
          <br />
          <br />
          <strong>Platinum Card Member</strong>
          <br />
          Initial top-up of $500: receive 72 servings of 285ml beer and two
          nights of free accommodation (advance booking required). Redemption is
          available from Tuesday to Thursday, limited to one serving per day.
          Beer and accommodation must be redeemed within 6 months. Platinum Card
          members enjoy a 15% discount. The membership card is valid for 1 year.
          <br />
          <br />
          <strong>Diamond Card Member</strong>
          <br />
          Initial top-up of $1,000: receive 120 servings of 285ml beer and five
          nights of free accommodation (advance booking required). Redemption is
          available from Monday to Sunday, limited to one serving per day. Beer
          and accommodation must be redeemed within 6 months. Diamond Card
          members enjoy a 25% discount. The membership card is valid for 1 year.
          <br />
          <br />
          <strong>Special Notes</strong>
          <br />
          The membership card is valid for 1 year and can be renewed annually,
          with the renewal following the latest membership benefit policies for
          that year. The membership card can be used at all Gobell Group hotels
          and businesses, and the same discounts apply when ordering from its
          online chocolate stores (auchocolates.com and
          violetchocolates.com.au). The discount policies across different
          hotels are generally consistent, but if any differences arise, the
          local hotel policy will prevail. Membership cards are divided into two
          types: Rechargeable Membership Cards and Points Membership Cards.
          Points Membership Cards can be used to redeem gifts, while
          Rechargeable Membership Cards offer both top-up rewards and the
          ability to redeem gifts using points. Membership discount policies are
          subject to change at any time, with the latest version prevailing.
          Gobell Group reserves the right of final interpretation for all
          discount policies.
          <br />
          <br />
          <strong>Australian Consumer Law Compliance</strong>
          <br />
          Gobell Group Pty Ltd abides by all relevant Australian Consumer Laws
          and regulations, including the Competition and Consumer Act 2010. Any
          benefits, discounts, or promotional offers provided under the
          membership card program are subject to availability and can change
          without notice. Customers are encouraged to review the most current
          membership rules and benefits on our official website.
          <br />
          <br />
          <strong>Disclaimer</strong>
          <br />
          The Gobell Group Pty Ltd reserves the right to make final
          interpretations of all membership rules and policies. While every
          effort is made to ensure that the information provided is accurate and
          up to date, Gobell Group Pty Ltd is not responsible for any errors or
          omissions or for the results obtained from the use of this
          information. By using this membership card, members agree to all terms
          and conditions as set out above and on our official website.
        </p>

        <motion.div
          className='my-12'
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.8 }}
        >
          <Image
            src='/graph/card-rules.svg'
            alt='Card Rules Illustration'
            width={300}
            height={300}
            className='card-padding'
          />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
