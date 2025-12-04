import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Search, Droplets, Zap, Wind, Satellite, Wrench, Package } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface PriceItem {
  name: string;
  minPrice: number;
  maxPrice: number;
}

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  items: PriceItem[];
}

// البيانات المستخرجة من الملف
const categories: Category[] = [
  {
    id: "plumbing",
    name: "سباكة",
    icon: <Droplets className="h-5 w-5" />,
    items: [
      { name: "ماكينة صندوق عاديه ضغط", minPrice: 115, maxPrice: 130 },
      { name: "ماكينة صندوق كليوباترا", minPrice: 75, maxPrice: 95 },
      { name: "حنفية صندوق عمودى", minPrice: 53, maxPrice: 60 },
      { name: "ماكنة اسبيك", minPrice: 140, maxPrice: 160 },
      { name: "خلاط شطاف", minPrice: 131.5, maxPrice: 200 },
      { name: "حنفية صندوق جانب", minPrice: 52.5, maxPrice: 60 },
      { name: "شمعة مرحلة اولى", minPrice: 17.5, maxPrice: 27 },
      { name: "شمعة مرحلة ثانية", minPrice: 17.5, maxPrice: 27 },
      { name: "شمعة مرحلة ثالثة", minPrice: 17.5, maxPrice: 27 },
      { name: "فلوماك ايطالي", minPrice: 400, maxPrice: 500 },
      { name: "محبس لاكور 3/4", minPrice: 160, maxPrice: 180 },
      { name: "طقم مسمار قاعدة", minPrice: 13.25, maxPrice: 15 },
      { name: "طقم مسمار سخان", minPrice: 13.25, maxPrice: 15 },
      { name: "طقم مسمار حوض", minPrice: 13.25, maxPrice: 15 },
      { name: "سيتترك", minPrice: 13.25, maxPrice: 15 },
      { name: "نبل", minPrice: 8.5, maxPrice: 10 },
      { name: "نبل شجرة", minPrice: 13.25, maxPrice: 15 },
      { name: "بوش 3/8*1/2", minPrice: 13.25, maxPrice: 15 },
      { name: "جلبة 3/4*1/2 نيكل", minPrice: 13.25, maxPrice: 15 },
      { name: "كوع 1/2 بوصة", minPrice: 17.5, maxPrice: 20 },
      { name: "تى نيكل 1/2 بوصة", minPrice: 17.5, maxPrice: 20 },
      { name: "جلبة 3/8*1/2", minPrice: 13.25, maxPrice: 20 },
      { name: "جلبة 1/2*1/2 نيكل", minPrice: 13.25, maxPrice: 20 },
      { name: "انبوبة سليكون المانى", minPrice: 35, maxPrice: 40 },
      { name: "لحام حار (914)", minPrice: 31, maxPrice: 40 },
      { name: "جلبة 4 بوصة طويلة", minPrice: 75, maxPrice: 90 },
      { name: "جلبة 4 بوصة سوستة طويلة", minPrice: 75, maxPrice: 90 },
      { name: "جلبة 4 بوصة سوستة", minPrice: 75, maxPrice: 90 },
      { name: "جلبة قاعدة مرحلة", minPrice: 75, maxPrice: 90 },
      { name: "جلبة قاعدة عدلة", minPrice: 75, maxPrice: 90 },
      { name: "صرف غسالة", minPrice: 44, maxPrice: 55 },
      { name: "صرف 2 بوصة مطبخ", minPrice: 26.5, maxPrice: 35 },
      { name: "صرف 2 بوصة مجوز", minPrice: 65, maxPrice: 80 },
      { name: "صرف 1.5 بوصة حوض وش", minPrice: 26.5, maxPrice: 35 },
      { name: "قلب صغير", minPrice: 21, maxPrice: 25 },
      { name: "قلب كبير", minPrice: 26.5, maxPrice: 30 },
      { name: "شيك بلف نحاس", minPrice: 40, maxPrice: 55 },
      { name: "شيك بلف ايطالى سخان", minPrice: 31, maxPrice: 45 },
      { name: "حنفية غسالة ايطالى", minPrice: 52.5, maxPrice: 60 },
      { name: "محبس 1/2 بوصة بليه", minPrice: 35, maxPrice: 50 },
      { name: "قلب 1/2 3 لنية", minPrice: 13.25, maxPrice: 20 },
      { name: "قلب سراميك", minPrice: 22, maxPrice: 30 },
      { name: "قلب المانى", minPrice: 17.5, maxPrice: 25 },
      { name: "قلب 3/4 دفن", minPrice: 25, maxPrice: 35 },
      { name: "قلب محبس دفن", minPrice: 25, maxPrice: 40 },
      { name: "وش محبس", minPrice: 4, maxPrice: 7 },
      { name: "وصلة اسبانى 3/8*1/2", minPrice: 26.5, maxPrice: 35 },
      { name: "نظم شطاف كوع", minPrice: 31, maxPrice: 40 },
      { name: "يد هند مكسر", minPrice: 20, maxPrice: 25 },
      { name: "يد شطاف خارجى", minPrice: 20, maxPrice: 25 },
      { name: "وصلة اسبانى 30 سم", minPrice: 26.5, maxPrice: 35 },
      { name: "وصلة اسبانى 40 سم", minPrice: 26.5, maxPrice: 35 },
      { name: "وصلة اسبانى 50 سم", minPrice: 26.5, maxPrice: 35 },
      { name: "وصلة اسبانى 60 سم", minPrice: 26.5, maxPrice: 35 },
      { name: "وصلة اسبانى متر", minPrice: 50, maxPrice: 65 },
      { name: "وصلة اسبانى شجرة", minPrice: 26.5, maxPrice: 35 },
      { name: "وصلة شطاف ساده ناشفه", minPrice: 17.5, maxPrice: 20 },
      { name: "نظم شطاف عدل بالواصلة", minPrice: 40, maxPrice: 55 },
      { name: "خرطوم دوش حرارى", minPrice: 48.5, maxPrice: 80 },
      { name: "شطاف خارجى", minPrice: 45, maxPrice: 90 },
      { name: "طابق حوض وش", minPrice: 55, maxPrice: 70 },
      { name: "طابق بانيو", minPrice: 88, maxPrice: 95 },
      { name: "محبس زوية", minPrice: 44, maxPrice: 55 },
      { name: "بكر تفلون", minPrice: 10, maxPrice: 12 },
      { name: "طقم سماعة دوش كامله", minPrice: 80, maxPrice: 100 },
      { name: "سماعة دوش", minPrice: 30, maxPrice: 50 },
      { name: "خرطوم بشبورى", minPrice: 27, maxPrice: 35 },
      { name: "افييز 3/4", minPrice: 20, maxPrice: 25 },
      { name: "طبه حوض نيكل", minPrice: 8, maxPrice: 13 },
      { name: "جلبة لحام بولى 3/4", minPrice: 5, maxPrice: 8 },
      { name: "بولى جلبه لحام 1/2 بوصه", minPrice: 4, maxPrice: 7 },
      { name: "كوع لحام بلاستك 1/2 بوصة", minPrice: 3, maxPrice: 7 },
      { name: "جلبة بسين ذكر 1/2*1/2", minPrice: 15, maxPrice: 25 },
      { name: "جلبة انثى 3/4*3/4", minPrice: 15, maxPrice: 25 },
      { name: "فارغ محبس دفن 3/4", minPrice: 15, maxPrice: 25 },
      { name: "جلبة انثي 1/2*1/2", minPrice: 13, maxPrice: 20 },
      { name: "كوع لحام 3/4", minPrice: 15, maxPrice: 20 },
      { name: "تى لحام 1/2 بوصة", minPrice: 20, maxPrice: 27 },
      { name: "طبة كاب 32 بوصة", minPrice: 20, maxPrice: 27 },
      { name: "جلبة لحام 50 ملى", minPrice: 10, maxPrice: 17 },
      { name: "تى لحام 50 ملى", minPrice: 18, maxPrice: 25 },
      { name: "كوع 45 و 90 ملى", minPrice: 10, maxPrice: 15 },
      { name: "تى بوصة حديد", minPrice: 22, maxPrice: 27 },
      { name: "بوش 3/4*1/2 حديد", minPrice: 6, maxPrice: 9 },
      { name: "كوع حديد", minPrice: 10, maxPrice: 15 },
      { name: "ماكينة ايديال", minPrice: 325, maxPrice: 340 },
      { name: "حنفيه ايديل", minPrice: 160, maxPrice: 180 },
      { name: "قلة ماكينة ديورفيت", minPrice: 132, maxPrice: 132 },
      { name: "عوامة جنب ديورفيت", minPrice: 114, maxPrice: 114 },
      { name: "عوامه دروفيت عمودى", minPrice: 110, maxPrice: 110 },
      { name: "فلتر خلاط هاند ميكسر", minPrice: 10, maxPrice: 15 },
      { name: "جلبه 4 بوصه معدن", minPrice: 44, maxPrice: 60 },
      { name: "صرف 3 بوصه تركى", minPrice: 18, maxPrice: 30 },
      { name: "قنطره خلاط", minPrice: 60, maxPrice: 75 },
      { name: "كوع بوصه و1/2 بجوان", minPrice: 20, maxPrice: 30 },
      { name: "محبس 2 لكور بولى", minPrice: 30, maxPrice: 40 },
      { name: "جلبه 2 بوصه بلاستك", minPrice: 7, maxPrice: 15 },
      { name: "تى لحام بوصه و1/2 بولى", minPrice: 20, maxPrice: 30 },
      { name: "كوع 2 بوصه بلاستك", minPrice: 11, maxPrice: 20 },
      { name: "تى بسن 1/2 بوصه", minPrice: 28.5, maxPrice: 35 },
      { name: "صرف مجوز 3 بوصه", minPrice: 100, maxPrice: 125 },
      { name: "طابق 3 بوصه", minPrice: 65, maxPrice: 80 },
      { name: "حنفيه فلتر", minPrice: 114, maxPrice: 125 },
      { name: "عازل", minPrice: 10, maxPrice: 15 },
      { name: "كوع بلاستك بوصه", minPrice: 4, maxPrice: 6 },
      { name: "افيز 1.1/2 بوصه", minPrice: 20, maxPrice: 25 },
      { name: "ماكينه دروفيت", minPrice: 219, maxPrice: 219 },
      { name: "حنفيه 1/2 بوصه", minPrice: 10, maxPrice: 15 },
      { name: "اكره شطاف ايديل", minPrice: 132, maxPrice: 145 },
      { name: "قلب شطاف ايديل", minPrice: 100, maxPrice: 125 },
      { name: "جلبه دكر 3/4*1/2", minPrice: 20, maxPrice: 25 },
      { name: "قلب خلاط جروهى", minPrice: 85, maxPrice: 85 },
      { name: "كوع بسن", minPrice: 15, maxPrice: 20 },
      { name: "كوتش صندوق قاعده", minPrice: 15, maxPrice: 25 },
      { name: "افيز 1 بوصه", minPrice: 10, maxPrice: 17 },
      { name: "وش بلاعه 15*15", minPrice: 30, maxPrice: 45 },
      { name: "كوع 90 درجه بلاستك", minPrice: 10, maxPrice: 20 },
      { name: "حنفيه 3/4", minPrice: 55, maxPrice: 67 },
      { name: "فارغ محبس 1/2 بولى", minPrice: 15, maxPrice: 25 },
      { name: "جلبه لحام 1/2", minPrice: 5, maxPrice: 8 },
      { name: "كوع لحام 1/2", minPrice: 5, maxPrice: 8 },
      { name: "جلبه 1/2 بوصه بسن دكر", minPrice: 10, maxPrice: 17 },
      { name: "فبره دروفيت", minPrice: 9, maxPrice: 9 },
      { name: "قلب دروفيت", minPrice: 35, maxPrice: 35 },
    ],
  },
  {
    id: "electrical",
    name: "كهرباء",
    icon: <Zap className="h-5 w-5" />,
    items: [
      { name: "مفتاح هاجر اتومتك 40 امبير", minPrice: 43, maxPrice: 65 },
      { name: "مفتاح هاجر اتومتك 32 امبير", minPrice: 43, maxPrice: 65 },
      { name: "مفتاح هاجر اتومتك 25 امبير", minPrice: 43, maxPrice: 65 },
      { name: "مفتاح مورة اتومتك 25 امبير", minPrice: 25, maxPrice: 47 },
      { name: "لقمة مفتاح بتشينو سولد", minPrice: 16, maxPrice: 23 },
      { name: "لقمة تليفون بتشينو سولد", minPrice: 16, maxPrice: 23 },
      { name: "لقمة بريزة سولد", minPrice: 16, maxPrice: 23 },
      { name: "ترنس 12", minPrice: 25, maxPrice: 35 },
      { name: "لقمة جرس بتشينو", minPrice: 16, maxPrice: 23 },
      { name: "لقمة جرس مايتكس", minPrice: 16, maxPrice: 23 },
      { name: "علبه صاج 15*10", minPrice: 20, maxPrice: 27 },
      { name: "لقمة مفتاح تيكنو", minPrice: 9, maxPrice: 13 },
      { name: "متر سلك 4 ملى سويدى", minPrice: 6.78, maxPrice: 10 },
      { name: "وش اسبوط غاطس", minPrice: 20, maxPrice: 25 },
      { name: "سلك نت", minPrice: 5, maxPrice: 7 },
      { name: "وش بتشينو معدن 2 فتحه", minPrice: 15, maxPrice: 20 },
      { name: "متر سلك 2 ملى سويدى", minPrice: 3.64, maxPrice: 5 },
      { name: "وش بتشينو معدن 3 فتحه", minPrice: 15, maxPrice: 23 },
      { name: "لقمة بريزة مجوفة", minPrice: 45, maxPrice: 60 },
      { name: "شاسية ساس", minPrice: 3, maxPrice: 5 },
      { name: "لمبه بلحه عاديه", minPrice: 3.5, maxPrice: 5 },
      { name: "مفتاح بتشينو خارج الحيط 32 امبير", minPrice: 75, maxPrice: 90 },
      { name: "لقمة بريزة ساس", minPrice: 11, maxPrice: 15 },
      { name: "بريزة خارجية بغطاء", minPrice: 25, maxPrice: 40 },
      { name: "لقمة تليفون ساس", minPrice: 20, maxPrice: 30 },
      { name: "لقمة جرس ماجيك", minPrice: 8, maxPrice: 12 },
      { name: "علبة تليفون 2*1 خارجى", minPrice: 6, maxPrice: 10 },
      { name: "لقمة مفتاح ساس", minPrice: 11, maxPrice: 15 },
      { name: "لقمة مفتاح ماجيك", minPrice: 6, maxPrice: 10 },
      { name: "سدادة ساس", minPrice: 1.5, maxPrice: 3 },
      { name: "ترنس 50 فولت", minPrice: 25, maxPrice: 40 },
      { name: "مفتاح كورى علبة ماجيك", minPrice: 52, maxPrice: 75 },
      { name: "ترانس 20 فولت (ملف)", minPrice: 45, maxPrice: 57 },
      { name: "مفتاح خارجى", minPrice: 75, maxPrice: 95 },
      { name: "ترانس 12 فولت", minPrice: 35, maxPrice: 47 },
      { name: "لمبة كاس (220 فولت) هلوجين", minPrice: 8.5, maxPrice: 15 },
      { name: "لمبة شوكة 12 فولت على الترنس", minPrice: 8, maxPrice: 15 },
      { name: "لمبة بولة", minPrice: 3.5, maxPrice: 8 },
      { name: "لمبه كاس ليد شبايه", minPrice: 39, maxPrice: 62 },
      { name: "لمبة مسمار 100 وات", minPrice: 3.5, maxPrice: 5 },
      { name: "لمبه ليد 5w", minPrice: 16, maxPrice: 23 },
      { name: "عود روزيته", minPrice: 20, maxPrice: 27 },
      { name: "مفتاح باب (ثلاجة)", minPrice: 5, maxPrice: 8 },
      { name: "لقمة بريزة ماجيك", minPrice: 6, maxPrice: 10 },
      { name: "وش بيتشينو معدن 1 فتحه", minPrice: 15, maxPrice: 22 },
      { name: "مفتاح وستنج هاوس 100 امبير", minPrice: 100, maxPrice: 128 },
      { name: "وش فوكس بلاستيك", minPrice: 4, maxPrice: 7 },
      { name: "ترانس 40 فولت (ملف)", minPrice: 32, maxPrice: 55 },
      { name: "وش ساس بلاستيك", minPrice: 6, maxPrice: 10 },
      { name: "لمبة موفرة 45 وات", minPrice: 19, maxPrice: 27 },
      { name: "بواط سقف", minPrice: 1.5, maxPrice: 4 },
      { name: "لمبة بولة كعب فلام", minPrice: 3.5, maxPrice: 8 },
      { name: "غطاء بواط 10*10", minPrice: 1, maxPrice: 3 },
      { name: "لمبة قلاووظ مصنفر", minPrice: 15, maxPrice: 24 },
      { name: "دواية خزاف", minPrice: 3.5, maxPrice: 7 },
      { name: "لمبة كاس ليد اصفر", minPrice: 39, maxPrice: 55 },
      { name: "دواية روندالة قلاووظ", minPrice: 6.5, maxPrice: 10 },
      { name: "لمبة كاس (12 فولت)", minPrice: 14, maxPrice: 25 },
      { name: "دواية بلحة", minPrice: 4.5, maxPrice: 7 },
      { name: "لمبة شوكة تيار", minPrice: 6.5, maxPrice: 8 },
      { name: "كبل ديمر لفة", minPrice: 25, maxPrice: 38 },
      { name: "دواية لمبة نيون مفرد", minPrice: 3, maxPrice: 5 },
      { name: "لمبة 120سم ابيض", minPrice: 9.75, maxPrice: 19 },
      { name: "مفتاح كمترة", minPrice: 6, maxPrice: 11 },
      { name: "لمبة نيون 60سم وارم", minPrice: 9.25, maxPrice: 19 },
      { name: "وش ذهبى ساس", minPrice: 8, maxPrice: 13 },
      { name: "متر سلك 2 ملى تيرمو سويدى", minPrice: 12.8, maxPrice: 20 },
      { name: "غطاء بواط 20*20", minPrice: 4, maxPrice: 5 },
      { name: "سلك مجدوول 2 ملى", minPrice: 3.6, maxPrice: 7 },
      { name: "متر فلكسيب", minPrice: 1.3, maxPrice: 3 },
      { name: "متر سلك 3 ملى سويدى", minPrice: 5.25, maxPrice: 9 },
      { name: "متر سلك شفاف (2 ملى)", minPrice: 3.2, maxPrice: 7 },
      { name: "متر سلك 6 ملى سويدى", minPrice: 10.35, maxPrice: 17 },
      { name: "متر سلك تليفون", minPrice: 1.45, maxPrice: 6 },
      { name: "دواية بلحة روندالة", minPrice: 8.5, maxPrice: 16 },
      { name: "لمبة نيون 60سم ابيض", minPrice: 9.25, maxPrice: 20 },
      { name: "مفتاح 3 فاز", minPrice: 460, maxPrice: 580 },
      { name: "لمبة نيون 120سم وارم", minPrice: 10.75, maxPrice: 20 },
      { name: "مفتاح 32 امبير سخان", minPrice: 110, maxPrice: 140 },
      { name: "دوايه 120سم بالقعده", minPrice: 3.5, maxPrice: 8 },
      { name: "شاسيه بتشينو", minPrice: 2, maxPrice: 4 },
      { name: "دوايه 120سم بدون القعده", minPrice: 2.5, maxPrice: 6 },
      { name: "سداده بريزه", minPrice: 5, maxPrice: 7 },
      { name: "متر سلك 7 طرف", minPrice: 11, maxPrice: 20 },
      { name: "علبه مفتاح خارج", minPrice: 4.5, maxPrice: 7 },
      { name: "دوايه رونداله نجف", minPrice: 4, maxPrice: 7 },
      { name: "لمبه فينوس موفره 13w", minPrice: 20, maxPrice: 32 },
      { name: "جرس سولد", minPrice: 15, maxPrice: 23 },
      { name: "لمبه فينوس 60w", minPrice: 25, maxPrice: 32 },
      { name: "لمبه موفره 36", minPrice: 30, maxPrice: 39 },
      { name: "لمبه 15w", minPrice: 19, maxPrice: 25 },
      { name: "لمبه بولا ليد كعب فلام", minPrice: 25, maxPrice: 33 },
      { name: "تليفون ماجيك", minPrice: 20, maxPrice: 27 },
      { name: "لمبه موفره كعب فلام 10w", minPrice: 18, maxPrice: 25 },
      { name: "لقمه بريزه ماجيك", minPrice: 25, maxPrice: 37 },
      { name: "لمبه حربه ليد 10w", minPrice: 30, maxPrice: 45 },
      { name: "علبه تليفون", minPrice: 15, maxPrice: 22 },
      { name: "لمبه كاس فينوس ابيض", minPrice: 45, maxPrice: 56 },
      { name: "لمبه كاس فينوس اصفر", minPrice: 45, maxPrice: 56 },
      { name: "لمبه شوكه ليد 5w", minPrice: 16, maxPrice: 24 },
      { name: "لمبه فينوس موفره 26w", minPrice: 50, maxPrice: 65 },
      { name: "لمبه 200w", minPrice: 19, maxPrice: 27 },
      { name: "لمبه بولا ليد 3w", minPrice: 17, maxPrice: 25 },
      { name: "وش بتشينو سولد", minPrice: 18, maxPrice: 27 },
      { name: "متر ليد", minPrice: 10, maxPrice: 17 },
      { name: "فلكس بتشينو سولد", minPrice: 28, maxPrice: 35 },
      { name: "فلكس وش معدن 2 فتحه", minPrice: 18, maxPrice: 25 },
    ],
  },
  {
    id: "ac",
    name: "تكييف",
    icon: <Wind className="h-5 w-5" />,
    items: [
      { name: "كونتكتور توتا لين صينى", minPrice: 110, maxPrice: 115 },
      { name: "عود فضة", minPrice: 5, maxPrice: 6 },
      { name: "كارتة صينى صغيره", minPrice: 135, maxPrice: 180 },
      { name: "دران 5 حصان صينى", minPrice: 88, maxPrice: 95 },
      { name: "دران 1.5 حصان صينى", minPrice: 88, maxPrice: 95 },
      { name: "ريموت كاريير", minPrice: 88, maxPrice: 95 },
      { name: "ريموت صينى", minPrice: 88, maxPrice: 95 },
      { name: "رسيفر ينيون", minPrice: 45, maxPrice: 55 },
      { name: "مسطرة تكييف صينى", minPrice: 132, maxPrice: 170 },
      { name: "فلتر ربع كابلارى", minPrice: 47, maxPrice: 60 },
      { name: "محبس 1/4 صينى", minPrice: 32, maxPrice: 40 },
      { name: "محبس 1/2 صينى", minPrice: 50, maxPrice: 60 },
      { name: "قلتر 1/4 لحام صينى", minPrice: 85, maxPrice: 95 },
      { name: "ينيون ربع (نبل) نحاس", minPrice: 13.25, maxPrice: 20 },
      { name: "ينيون نص (نبل) نحاس", minPrice: 13.25, maxPrice: 20 },
      { name: "حساس كويل صينى", minPrice: 66, maxPrice: 70 },
      { name: "سنسور روم وصلة طويلة", minPrice: 11, maxPrice: 15 },
      { name: "كباستور 5 كابيكتور صينى", minPrice: 43, maxPrice: 50 },
      { name: "كباستور 45 كابكتور صينى", minPrice: 88, maxPrice: 90 },
      { name: "كباستور 60 كابكتور صينى", minPrice: 88, maxPrice: 90 },
      { name: "كباستور 55 كابكتور صينى", minPrice: 88, maxPrice: 90 },
      { name: "كباستور 40 كابكتور صينى", minPrice: 88, maxPrice: 90 },
      { name: "ايوزار", minPrice: 150, maxPrice: 160 },
      { name: "كباستور كابكتور صينى", minPrice: 88, maxPrice: 90 },
      { name: "كباستور فانة 1.5 صينى", minPrice: 44, maxPrice: 50 },
      { name: "كباستور فانة 3 صينى", minPrice: 43, maxPrice: 50 },
      { name: "كباستور فانة 2 صينى", minPrice: 44, maxPrice: 50 },
      { name: "كباستور صغير 35 كابكتور صينى", minPrice: 88, maxPrice: 90 },
      { name: "مجموعة ثلاجة صينى", minPrice: 44, maxPrice: 44 },
      { name: "صامولة 1/4 نحاس", minPrice: 9, maxPrice: 15 },
      { name: "صامولة 1/2 نحاس", minPrice: 13, maxPrice: 18 },
      { name: "كبلارى صينى", minPrice: 40, maxPrice: 50 },
      { name: "كافر 1.5 شارب", minPrice: 66, maxPrice: 90 },
      { name: "كافر 1.5 ينيون اير", minPrice: 66, maxPrice: 90 },
      { name: "كافر 1.5 كاريير", minPrice: 66, maxPrice: 90 },
      { name: "كافر 3,4 ينيون اير", minPrice: 66, maxPrice: 90 },
      { name: "كافر كاريير 3", minPrice: 66, maxPrice: 90 },
      { name: "بلف شحن صينى", minPrice: 4, maxPrice: 7 },
      { name: "متر ماسوره 5/8 نحاس", minPrice: 80, maxPrice: 90 },
      { name: "صامولة 5/8 نحاس", minPrice: 13.25, maxPrice: 20 },
      { name: "متر ماسوره 3/8 نحاس", minPrice: 60, maxPrice: 70 },
      { name: "صامولة 3/8 نحاس", minPrice: 13.25, maxPrice: 20 },
      { name: "متر ماسوره 1/4 نحاس", minPrice: 32, maxPrice: 40 },
      { name: "حساس روم صينى", minPrice: 66, maxPrice: 70 },
      { name: "متر ماسوره 1/2 نحاس", minPrice: 40, maxPrice: 50 },
      { name: "حساس خارج صينى", minPrice: 66, maxPrice: 70 },
      { name: "ارم فلكس صينى", minPrice: 13.25, maxPrice: 15 },
      { name: "شحنه فريون هندى", minPrice: 320, maxPrice: 400 },
      { name: "كيلو عازل ابيض صينى", minPrice: 17, maxPrice: 20 },
      { name: "نبل لحام 1/4 نحاس", minPrice: 13.25, maxPrice: 20 },
      { name: "نبل 1/2 لحام نحاس", minPrice: 13.25, maxPrice: 20 },
      { name: "نبل لحام 5/8 نحاس", minPrice: 17.5, maxPrice: 20 },
      { name: "كابستر 50 كابكتور صينى", minPrice: 88, maxPrice: 90 },
      { name: "ينيون 5/8 نحاس", minPrice: 30, maxPrice: 40 },
      { name: "كابستر 35 نحاس", minPrice: 88, maxPrice: 90 },
      { name: "ينيون 3/8 نحاس", minPrice: 19, maxPrice: 25 },
      { name: "كابولى صغير", minPrice: 95, maxPrice: 100 },
      { name: "كابولى وسط", minPrice: 160, maxPrice: 190 },
    ],
  },
  {
    id: "satellite",
    name: "دش",
    icon: <Satellite className="h-5 w-5" />,
    items: [
      { name: "عدسة مخرج واحد ترومان صينى", minPrice: 45, maxPrice: 65 },
      { name: "عدسة 2 مخرج ترومان صينى", minPrice: 85, maxPrice: 115 },
      { name: "عدسة 4 مخرج ترومان صينى", minPrice: 200, maxPrice: 260 },
      { name: "لفة سلك دش 100 متر تيليفيز اسبانى", minPrice: 300, maxPrice: 395 },
      { name: "لفة سلك دش 50 متر تيليفيز اسبانى", minPrice: 150, maxPrice: 195 },
      { name: "لفة سلك دش 25 متر تيليفيز اسبانى", minPrice: 75, maxPrice: 95 },
      { name: "لفة سلك دش 30 متر تيليفيز اسبانى", minPrice: 115, maxPrice: 150 },
      { name: "طبق دش 70 برفكس صينى", minPrice: 130, maxPrice: 170 },
      { name: "طابق دش 85 برفكس صينى", minPrice: 180, maxPrice: 230 },
      { name: "ديزك ترومان صينى", minPrice: 30, maxPrice: 40 },
      { name: "وصلة HD صينى", minPrice: 35, maxPrice: 45 },
      { name: "حامل شاشة كبير فوكس صينى", minPrice: 120, maxPrice: 155 },
      { name: "حامل شاشة وسط فوكس صينى", minPrice: 110, maxPrice: 145 },
      { name: "حامل شاشة صغير فوكس صينى", minPrice: 100, maxPrice: 130 },
      { name: "سلك دش 10 متر تيليفيز اسبانى", minPrice: 65, maxPrice: 85 },
      { name: "ريموت شاشة صينى", minPrice: 50, maxPrice: 65 },
      { name: "ريموت رسيفر صينى", minPrice: 50, maxPrice: 65 },
      { name: "لفة سلك دش 15 متر تيليفيز اسبانى", minPrice: 70, maxPrice: 90 },
      { name: "قطعه اف كونكتور صينى", minPrice: 2.5, maxPrice: 2.5 },
    ],
  },
  {
    id: "carpentry",
    name: "نجارة",
    icon: <Wrench className="h-5 w-5" />,
    items: [
      { name: "فراشة كاملة", minPrice: 80, maxPrice: 95 },
      { name: "كالون فندقى", minPrice: 80, maxPrice: 100 },
      { name: "كالون اوضة", minPrice: 50, maxPrice: 65 },
      { name: "كالون حمام", minPrice: 65, maxPrice: 65 },
      { name: "مجرة درج ضيق 35سم", minPrice: 25, maxPrice: 40 },
      { name: "مجرة درج عريضة ايطالى (40سم)", minPrice: 80, maxPrice: 90 },
      { name: "مجرة درج ايطالى عريضة (30سم)", minPrice: 30, maxPrice: 45 },
      { name: "كالون سيخ سكاك 3 درج", minPrice: 35, maxPrice: 47 },
      { name: "عين سحرية", minPrice: 20, maxPrice: 25 },
      { name: "مفصلة باب شقة", minPrice: 15, maxPrice: 20 },
      { name: "مفصلة باب اوضة", minPrice: 15, maxPrice: 20 },
      { name: "طقم اوكرة حمام", minPrice: 70, maxPrice: 85 },
      { name: "عصفورة شباك", minPrice: 15, maxPrice: 25 },
      { name: "اوكرة داموس", minPrice: 115, maxPrice: 127 },
      { name: "اوكرة DSL", minPrice: 70, maxPrice: 85 },
      { name: "كالون دارج", minPrice: 30, maxPrice: 47 },
      { name: "زواية بلتكانة", minPrice: 5, maxPrice: 7 },
      { name: "عجلة السعد", minPrice: 25, maxPrice: 35 },
      { name: "مفصلة زتونة", minPrice: 10, maxPrice: 17 },
      { name: "مفصلة عدلة", minPrice: 12, maxPrice: 17 },
      { name: "علقة ماسورة ستارة", minPrice: 15, maxPrice: 25 },
      { name: "عجلة PS", minPrice: 45, maxPrice: 65 },
      { name: "نص فراشة", minPrice: 20, maxPrice: 27 },
      { name: "سكاك سندويتش", minPrice: 45, maxPrice: 56 },
      { name: "سكاك فالكون", minPrice: 35, maxPrice: 50 },
      { name: "اوكرة غراب", minPrice: 35, maxPrice: 47 },
      { name: "ترباس مفصلى", minPrice: 25, maxPrice: 32 },
      { name: "اوكرة سباليونة 420", minPrice: 60, maxPrice: 75 },
      { name: "طقم تسكيك سباليونة", minPrice: 15, maxPrice: 25 },
      { name: "كالون دولاب لطش", minPrice: 90, maxPrice: 110 },
      { name: "اوكرة سكاك", minPrice: 30, maxPrice: 40 },
      { name: "اوكرة السعد", minPrice: 35, maxPrice: 47 },
      { name: "ترباس", minPrice: 10, maxPrice: 13 },
      { name: "اوكرة درج او درفة", minPrice: 20, maxPrice: 27 },
      { name: "دراع درفة", minPrice: 35, maxPrice: 37 },
      { name: "سوستة درفة مطبخ", minPrice: 3, maxPrice: 5 },
      { name: "عجلة بجرار سفلى", minPrice: 30, maxPrice: 40 },
      { name: "مفتاح سكاك كنج", minPrice: 50, maxPrice: 62 },
      { name: "كالون باب اوضه", minPrice: 50, maxPrice: 62 },
      { name: "مجره درج 45سم", minPrice: 25, maxPrice: 30 },
      { name: "مفصله 1/2 ركبه", minPrice: 12, maxPrice: 20 },
      { name: "مجره درج 50سم", minPrice: 42, maxPrice: 55 },
      { name: "مفصله عند كبوت المطبخ ضفضعه", minPrice: 45, maxPrice: 60 },
      { name: "كلون سبليونه", minPrice: 80, maxPrice: 92 },
      { name: "عصفوره وش المونتال", minPrice: 15, maxPrice: 27 },
      { name: "كالون سيخ درج", minPrice: 35, maxPrice: 40 },
      { name: "مجموعه اغلاق", minPrice: 15, maxPrice: 25 },
      { name: "انبوبه فوم", minPrice: 90, maxPrice: 95 },
      { name: "عجله كرسي مكتب", minPrice: 40, maxPrice: 55 },
      { name: "اكره حمام اشاره", minPrice: 50, maxPrice: 65 },
      { name: "عجل سلك المونتال", minPrice: 5, maxPrice: 7 },
      { name: "اكره سبليونه 440", minPrice: 80, maxPrice: 92 },
      { name: "طقم عجل الاصلي", minPrice: 50, maxPrice: 65 },
      { name: "ركبه معدن", minPrice: 10, maxPrice: 15 },
      { name: "عظم درفه سلك", minPrice: 5, maxPrice: 7 },
      { name: "مفصله ركبه", minPrice: 12, maxPrice: 18 },
      { name: "جنشه اغلاق", minPrice: 15, maxPrice: 20 },
      { name: "مفصله زتونه", minPrice: 30, maxPrice: 35 },
      { name: "كالون باب شقه", minPrice: 170, maxPrice: 175 },
      { name: "حبل التنده", minPrice: 40, maxPrice: 45 },
      { name: "زويه تجميع", minPrice: 2, maxPrice: 5 },
      { name: "كالون لوكر", minPrice: 30, maxPrice: 40 },
    ],
  },
];

const MaterialsPricing = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredCategories = useMemo(() => {
    if (activeCategory === "all") {
      return categories.map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }));
    }
    return categories
      .filter((category) => category.id === activeCategory)
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        ),
      }));
  }, [searchQuery, activeCategory]);

  const totalItems = useMemo(() => {
    return filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);
  }, [filteredCategories]);

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4">
              <Package className="h-4 w-4 ml-2" />
              قائمة الأسعار المحدثة
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              أسعار الخامات والمستلزمات
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              دليلك الشامل لأسعار قطع الغيار والخامات المستخدمة في أعمال الصيانة
            </p>

            {/* Search Box */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="ابحث عن قطعة غيار..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-12 h-14 text-lg bg-card border-border"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <Tabs
            value={activeCategory}
            onValueChange={setActiveCategory}
            className="w-full"
          >
            <TabsList className="flex flex-wrap justify-center gap-2 bg-transparent h-auto mb-8">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-3 rounded-full"
              >
                <Package className="h-4 w-4 ml-2" />
                الكل ({categories.reduce((acc, cat) => acc + cat.items.length, 0)})
              </TabsTrigger>
              {categories.map((category) => (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground px-6 py-3 rounded-full"
                >
                  {category.icon}
                  <span className="mr-2">
                    {category.name} ({category.items.length})
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Results Count */}
            <div className="text-center mb-6">
              <p className="text-muted-foreground">
                عرض <span className="font-bold text-foreground">{totalItems}</span> منتج
              </p>
            </div>

            <TabsContent value="all" className="mt-0">
              <div className="space-y-8">
                {filteredCategories.map((category) =>
                  category.items.length > 0 ? (
                    <motion.div
                      key={category.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Card className="border-border bg-card overflow-hidden">
                        <CardHeader className="bg-muted/50 border-b border-border">
                          <CardTitle className="flex items-center gap-3 text-xl">
                            <span className="p-2 rounded-lg bg-primary/10 text-primary">
                              {category.icon}
                            </span>
                            {category.name}
                            <Badge variant="outline" className="mr-auto">
                              {category.items.length} منتج
                            </Badge>
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-0">
                          <div className="overflow-x-auto">
                            <Table>
                              <TableHeader>
                                <TableRow className="bg-muted/30">
                                  <TableHead className="text-right font-bold">
                                    اسم المنتج
                                  </TableHead>
                                  <TableHead className="text-center font-bold">
                                    السعر الأدنى
                                  </TableHead>
                                  <TableHead className="text-center font-bold">
                                    السعر الأقصى
                                  </TableHead>
                                  <TableHead className="text-center font-bold">
                                    متوسط السعر
                                  </TableHead>
                                </TableRow>
                              </TableHeader>
                              <TableBody>
                                {category.items.map((item, index) => (
                                  <TableRow
                                    key={index}
                                    className="hover:bg-muted/30 transition-colors"
                                  >
                                    <TableCell className="font-medium">
                                      {item.name}
                                    </TableCell>
                                    <TableCell className="text-center">
                                      <Badge
                                        variant="secondary"
                                        className="bg-green-500/10 text-green-600 border-green-500/20"
                                      >
                                        {item.minPrice} ج.م
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                      <Badge
                                        variant="secondary"
                                        className="bg-red-500/10 text-red-600 border-red-500/20"
                                      >
                                        {item.maxPrice} ج.م
                                      </Badge>
                                    </TableCell>
                                    <TableCell className="text-center">
                                      <Badge variant="outline">
                                        {((item.minPrice + item.maxPrice) / 2).toFixed(
                                          0
                                        )}{" "}
                                        ج.م
                                      </Badge>
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ) : null
                )}
              </div>
            </TabsContent>

            {categories.map((category) => (
              <TabsContent key={category.id} value={category.id} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="border-border bg-card overflow-hidden">
                    <CardHeader className="bg-muted/50 border-b border-border">
                      <CardTitle className="flex items-center gap-3 text-xl">
                        <span className="p-2 rounded-lg bg-primary/10 text-primary">
                          {category.icon}
                        </span>
                        {category.name}
                        <Badge variant="outline" className="mr-auto">
                          {
                            filteredCategories.find((c) => c.id === category.id)
                              ?.items.length
                          }{" "}
                          منتج
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <div className="overflow-x-auto">
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-muted/30">
                              <TableHead className="text-right font-bold">
                                اسم المنتج
                              </TableHead>
                              <TableHead className="text-center font-bold">
                                السعر الأدنى
                              </TableHead>
                              <TableHead className="text-center font-bold">
                                السعر الأقصى
                              </TableHead>
                              <TableHead className="text-center font-bold">
                                متوسط السعر
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {filteredCategories
                              .find((c) => c.id === category.id)
                              ?.items.map((item, index) => (
                                <TableRow
                                  key={index}
                                  className="hover:bg-muted/30 transition-colors"
                                >
                                  <TableCell className="font-medium">
                                    {item.name}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Badge
                                      variant="secondary"
                                      className="bg-green-500/10 text-green-600 border-green-500/20"
                                    >
                                      {item.minPrice} ج.م
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Badge
                                      variant="secondary"
                                      className="bg-red-500/10 text-red-600 border-red-500/20"
                                    >
                                      {item.maxPrice} ج.م
                                    </Badge>
                                  </TableCell>
                                  <TableCell className="text-center">
                                    <Badge variant="outline">
                                      {((item.minPrice + item.maxPrice) / 2).toFixed(0)}{" "}
                                      ج.م
                                    </Badge>
                                  </TableCell>
                                </TableRow>
                              ))}
                          </TableBody>
                        </Table>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </TabsContent>
            ))}
          </Tabs>

          {/* No Results */}
          {totalItems === 0 && (
            <div className="text-center py-16">
              <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                لا توجد نتائج
              </h3>
              <p className="text-muted-foreground">
                جرب البحث بكلمات مختلفة
              </p>
            </div>
          )}

          {/* Disclaimer */}
          <Card className="mt-12 border-secondary/30 bg-secondary/5">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground text-sm">
                <strong className="text-foreground">ملاحظة:</strong> الأسعار المعروضة
                استرشادية وقد تختلف حسب الموقع والكمية والمورد. يرجى التواصل معنا للحصول
                على عرض سعر محدث.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MaterialsPricing;
