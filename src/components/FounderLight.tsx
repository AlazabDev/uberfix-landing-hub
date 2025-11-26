import { Button } from "@/components/ui/button";

export default function FounderLight() {
  return (
    <section
      className="relative py-24 bg-[#0f172a] text-center"
      dir="rtl"
    >
      {/* خلفية الكرة الأرضية بنفس اللون */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('https://al-azab.co/assets/img/earth-dark.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="container relative z-10 mx-auto px-6">
        
        {/* صورة المؤسس */}
        <img
          src="https://al-azab.co/assets/img/founder.png"
          alt="المؤسس محمد العزب"
          className="w-40 h-40 object-cover rounded-full mx-auto shadow-xl border-4 border-[#f5bf23]"
        />

        {/* العنوان */}
        <h2 className="text-4xl font-bold text-white mt-6">
          من فني إلى مؤسس ورئيس تنفيذي لشركة العزب
        </h2>

        {/* النص الملهم */}
        <p className="max-w-3xl mx-auto text-lg text-gray-300 leading-relaxed mt-4">
          بدأت القصة من الميدان… من الصيانة… من التعب الحقيقي.  
          رحلة طويلة من التعلم والانضباط وبناء الثقة،  
          حتى تأسست شركة العزب لتصبح واحدة من أسرع المنظومات نموًا في السوق المصري،  
          وتقدم حلولًا متكاملة للهندسة والتشغيل والصيانة.
        </p>

        {/* زر الانتقال */}
        <Button
          className="mt-8 bg-[#f5bf23] text-[#0f172a] hover:bg-[#ddb21e] font-semibold rounded-full px-10 py-6 text-lg shadow-lg"
          onClick={() => (window.location.href = "/founder")}
        >
          اكتشف قصة المؤسس
        </Button>
      </div>
    </section>
  );
}

