import { Button } from "@/components/ui/button";

export default function FounderSpotlight() {
  return (
    <section
      className="relative py-24 bg-gradient-to-b from-[#f5f5f5] to-[#e9ecef] text-center"
      dir="rtl"
    >
      <div className="container mx-auto px-6">

        {/* صورة المؤسس */}
        <img
          src="https://al-azab.co/assets/img/founder.png"
          alt="المؤسس محمد العزب"
          className="w-40 h-40 object-cover rounded-full mx-auto shadow-lg border-4 border-[#f5bf23]"
        />

        {/* العنوان */}
        <h2 className="text-4xl font-bold text-[#0f172a] mt-6">
          من فني بسيط إلى مؤسس مجموعة العزب
        </h2>

        {/* النص الملهم */}
        <p className="max-w-3xl mx-auto text-lg text-gray-700 leading-relaxed mt-4">
          بدأت القصة من الميدان… من الصيانة… من التعب الحقيقي.  
          رحلة طويلة من التعلم والانضباط وبناء الثقة،  
          حتى تأسست شركة العزب لتصبح واحدة من أسرع المنظومات نموًا في السوق المصري،  
          وتقدم حلولًا متكاملة للهندسة والتشغيل والصيانة.
        </p>

        {/* زر الانتقال */}
        <Button
          className="mt-8 bg-[#f5bf23] text-[#0f172a] hover:bg-[#e2ab1f] font-semibold rounded-full px-10 py-6 text-lg shadow-md"
          onClick={() => (window.location.href = "/founder")}
        >
          اكتشف قصة المؤسس
        </Button>
      </div>
    </section>
  );
}
