import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import WhyUs from "@/components/WhyUs";
import CashLoan from "@/components/CashLoan";
import Feedback from "@/components/Feedback";
import Conditions from "@/components/Conditions";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import FloatButtons from "@/components/FloatButtons";
import { hasLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

export default async function Home({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <>
      <Header dict={dict} lang={lang} />
      <main>
        <Hero dict={dict} />
        <WhyUs dict={dict} />
        <CashLoan dict={dict} />
        <Feedback dict={dict} />
        <Conditions dict={dict} />
        <Contact dict={dict} />
      </main>
      <Footer dict={dict} />
      <FloatButtons dict={dict} />
    </>
  );
}
