import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Building2, Search, Grid3x3, Layers, Wrench, Store, Zap, Filter } from "lucide-react";

interface Project {
  id: number;
  title: string;
  category: string;
  type: string;
  before?: string;
  after: string;
  description: string;
  tags: string[];
  location?: string;
}

const projects: Project[] = [
  // أبو عوف Projects
  {
    id: 1,
    title: "فرع أبو عوف - التجمع الخامس",
    category: "أبو عوف",
    type: "تشطيبات تجارية",
    after: "https://al-azab.co/img/abuauf_2.jpg",
    description: "تشطيب وتجهيز فرع تجاري متكامل",
    tags: ["تشطيبات", "كهرباء", "ديكور"],
    location: "القاهرة"
  },
  {
    id: 2,
    title: "فرع أبو عوف - مول العرب",
    category: "أبو عوف",
    type: "صيانة دورية",
    after: "https://al-azab.co/img/abuauf_12.jpg",
    description: "صيانة شاملة للأنظمة الكهربائية والميكانيكية",
    tags: ["صيانة", "كهرباء"],
    location: "الجيزة"
  },
  {
    id: 3,
    title: "فرع أبو عوف - سيتي ستارز",
    category: "أبو عوف",
    type: "تجديد وصيانة",
    after: "https://al-azab.co/img/abuauf_19.jpg",
    description: "تجديد كامل للواجهات والديكور الداخلي",
    tags: ["تجديد", "ديكور"],
    location: "القاهرة"
  },
  {
    id: 4,
    title: "فرع أبو عوف - المعادي",
    category: "أبو عوف",
    type: "تشطيبات تجارية",
    after: "https://al-azab.co/img/abuauf_22.jpg",
    description: "إنشاء وتشطيب فرع جديد",
    tags: ["تشطيبات", "سباكة", "كهرباء"],
    location: "القاهرة"
  },
  {
    id: 5,
    title: "فرع أبو عوف - مدينة نصر",
    category: "أبو عوف",
    type: "صيانة شاملة",
    after: "https://al-azab.co/img/abuauf_23.jpg",
    description: "صيانة دورية وتحديث الأنظمة",
    tags: ["صيانة", "تكييف"],
    location: "القاهرة"
  },
  {
    id: 6,
    title: "فرع أبو عوف - الإسكندرية",
    category: "أبو عوف",
    type: "تشطيبات تجارية",
    after: "https://al-azab.co/img/abuauf_28.jpg",
    description: "تجهيز فرع جديد بالكامل",
    tags: ["تشطيبات", "ديكور"],
    location: "الإسكندرية"
  },
  {
    id: 7,
    title: "فرع أبو عوف - الشروق",
    category: "أبو عوف",
    type: "صيانة وتجديد",
    after: "https://al-azab.co/img/abuauf_30.jpg",
    description: "تحديث وصيانة شاملة",
    tags: ["صيانة", "تجديد"],
    location: "القاهرة"
  },
  {
    id: 8,
    title: "فرع أبو عوف - الرحاب",
    category: "أبو عوف",
    type: "تشطيبات تجارية",
    after: "https://al-azab.co/img/abuauf_34.jpg",
    description: "تشطيب فرع تجاري حديث",
    tags: ["تشطيبات", "كهرباء"],
    location: "القاهرة"
  },
  {
    id: 9,
    title: "فرع أبو عوف - القاهرة الجديدة",
    category: "أبو عوف",
    type: "تجديد كامل",
    after: "https://al-azab.co/img/abuauf_38.jpg",
    description: "تجديد شامل للفرع",
    tags: ["تجديد", "ديكور"],
    location: "القاهرة"
  },
  {
    id: 10,
    title: "فرع أبو عوف - المنصورة",
    category: "أبو عوف",
    type: "تشطيبات تجارية",
    after: "https://al-azab.co/img/abuauf_44.jpg",
    description: "إنشاء فرع جديد",
    tags: ["تشطيبات", "سباكة"],
    location: "المنصورة"
  },
  {
    id: 11,
    title: "فرع أبو عوف - طنطا",
    category: "أبو عوف",
    type: "صيانة دورية",
    after: "https://al-azab.co/img/abuauf_47.jpg",
    description: "صيانة وتحسينات",
    tags: ["صيانة"],
    location: "طنطا"
  },
  // صيانة عامة Projects
  {
    id: 12,
    title: "صيانة كهربائية - مبنى تجاري",
    category: "صيانة عامة",
    type: "كهرباء",
    after: "https://al-azab.co/img/maintenance06.jpg",
    description: "صيانة وإصلاح الأنظمة الكهربائية",
    tags: ["كهرباء", "صيانة"],
    location: "القاهرة"
  },
  {
    id: 13,
    title: "أعمال سباكة - منشأة سكنية",
    category: "صيانة عامة",
    type: "سباكة",
    after: "https://al-azab.co/img/maintenance07.jpg",
    description: "تركيب وصيانة أنظمة السباكة",
    tags: ["سباكة", "صيانة"],
    location: "الجيزة"
  },
  {
    id: 14,
    title: "صيانة تكييف مركزي",
    category: "صيانة عامة",
    type: "تكييف وتبريد",
    after: "https://al-azab.co/img/maintenance08.jpg",
    description: "صيانة وتحديث أنظمة التكييف",
    tags: ["تكييف", "صيانة"],
    location: "القاهرة"
  },
  {
    id: 15,
    title: "أعمال نجارة - مكاتب إدارية",
    category: "صيانة عامة",
    type: "نجارة",
    after: "https://al-azab.co/img/maintenance09.jpg",
    description: "تركيب وصيانة الأبواب والنوافذ",
    tags: ["نجارة", "تشطيبات"],
    location: "القاهرة"
  },
  {
    id: 16,
    title: "دهانات وتشطيبات",
    category: "صيانة عامة",
    type: "دهانات",
    after: "https://al-azab.co/img/maintenance10.jpg",
    description: "أعمال دهانات وتشطيبات نهائية",
    tags: ["دهانات", "تشطيبات"],
    location: "الجيزة"
  },
  {
    id: 17,
    title: "صيانة شاملة - مجمع تجاري",
    category: "صيانة عامة",
    type: "صيانة شاملة",
    after: "https://al-azab.co/img/maintenance11.jpg",
    description: "صيانة دورية متكاملة",
    tags: ["صيانة", "متعدد"],
    location: "القاهرة"
  },
  {
    id: 18,
    title: "أعمال كهرباء - فيلا",
    category: "صيانة عامة",
    type: "كهرباء",
    after: "https://al-azab.co/img/maintenance12.jpg",
    description: "تركيب وصيانة الأنظمة الكهربائية",
    tags: ["كهرباء"],
    location: "6 أكتوبر"
  },
  {
    id: 19,
    title: "صيانة سباكة - مطعم",
    category: "صيانة عامة",
    type: "سباكة",
    after: "https://al-azab.co/img/maintenance13.jpg",
    description: "إصلاح وصيانة أنظمة المياه",
    tags: ["سباكة", "صيانة"],
    location: "القاهرة"
  },
  {
    id: 20,
    title: "تركيب تكييفات",
    category: "صيانة عامة",
    type: "تكييف وتبريد",
    after: "https://al-azab.co/img/maintenance14.jpg",
    description: "تركيب وتشغيل أنظمة التكييف",
    tags: ["تكييف"],
    location: "الجيزة"
  },
  {
    id: 21,
    title: "أعمال ألمنيوم وزجاج",
    category: "صيانة عامة",
    type: "ألمنيوم",
    after: "https://al-azab.co/img/maintenance15.jpg",
    description: "تركيب الواجهات الزجاجية",
    tags: ["ألمنيوم", "تشطيبات"],
    location: "القاهرة"
  },
  {
    id: 22,
    title: "صيانة عامة - محل تجاري",
    category: "صيانة عامة",
    type: "صيانة متعددة",
    after: "https://al-azab.co/img/maintenance16.jpg",
    description: "صيانة شاملة ومتنوعة",
    tags: ["صيانة", "متعدد"],
    location: "الإسكندرية"
  },
  {
    id: 23,
    title: "تشطيبات نهائية - شقة",
    category: "صيانة عامة",
    type: "تشطيبات",
    after: "https://al-azab.co/img/maintenance17.jpg",
    description: "أعمال تشطيبات كاملة",
    tags: ["تشطيبات", "دهانات"],
    location: "القاهرة"
  },
];

const categories = ["الكل", "أبو عوف", "صيانة عامة"];
const types = [
  "الكل",
  "تشطيبات تجارية",
  "صيانة دورية",
  "كهرباء",
  "سباكة",
  "تكييف وتبريد",
  "تجديد وصيانة",
  "نجارة",
  "دهانات",
];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedType, setSelectedType] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProjects = projects.filter((project) => {
    const matchesCategory = selectedCategory === "الكل" || project.category === selectedCategory;
    const matchesType = selectedType === "الكل" || project.type === selectedType;
    const matchesSearch =
      searchQuery === "" ||
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesType && matchesSearch;
  });

  const stats = {
    total: projects.length,
    categories: categories.length - 1,
    types: types.length - 1,
    filtered: filteredProjects.length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-background to-secondary/5">
      <Navigation />

      <section className="py-20" dir="rtl">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-secondary/20 to-primary/20 backdrop-blur-sm text-secondary px-6 py-3 rounded-full mb-6 border border-secondary/20">
              <Building2 className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-bold">معرض أعمالنا المميزة</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
              محفظة <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-primary">المشروعات</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
              نفخر بتقديم أعمال صيانة وتشغيل احترافية لكبرى الشركات والمنشآت في مصر
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12">
              {[
                { label: "مشروع منفذ", value: stats.total, icon: Building2 },
                { label: "عميل مميز", value: stats.categories, icon: Store },
                { label: "نوع خدمة", value: stats.types, icon: Wrench },
                { label: "مدينة", value: "15+", icon: Zap },
              ].map((stat, index) => (
                <Card
                  key={index}
                  className="p-6 text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-secondary/20 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-secondary" />
                  <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </Card>
              ))}
            </div>
          </div>

          {/* Search and Filters */}
          <div className="mb-12 space-y-6">
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="ابحث عن مشروع، خدمة، أو كلمة مفتاحية..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pr-12 pl-4 py-4 rounded-full border-2 border-secondary/20 bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-secondary transition-all"
                />
              </div>
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Filter className="w-4 h-4" />
                <span className="font-medium">العميل:</span>
              </div>
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-6 py-2.5 rounded-full font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-gradient-to-r from-secondary to-primary text-secondary-foreground shadow-lg scale-105"
                      : "bg-muted/50 text-muted-foreground hover:bg-muted/80 hover:scale-105"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Type Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Layers className="w-4 h-4" />
                <span className="font-medium">نوع العمل:</span>
              </div>
              {types.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    selectedType === type
                      ? "bg-primary text-primary-foreground shadow-md scale-105"
                      : "bg-card border border-border text-foreground hover:border-primary/50 hover:scale-105"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>

            {/* View Mode Toggle */}
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === "grid"
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <Grid3x3 className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-3 rounded-lg transition-all ${
                  viewMode === "list"
                    ? "bg-secondary text-secondary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                <Layers className="w-5 h-5" />
              </button>
            </div>

            {/* Results Count */}
            <div className="text-center text-muted-foreground">
              <span className="font-medium text-foreground">{stats.filtered}</span> مشروع من أصل{" "}
              <span className="font-medium text-foreground">{stats.total}</span>
            </div>
          </div>

          {/* Projects Grid/List */}
          <div
            className={
              viewMode === "grid"
                ? "grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-6 max-w-4xl mx-auto"
            }
          >
            {filteredProjects.map((project, index) => (
              <Card
                key={project.id}
                onClick={() => setSelectedProject(project)}
                className={`overflow-hidden hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group cursor-pointer border-border/50 hover:border-secondary/50 animate-scale-in ${
                  viewMode === "list" ? "flex flex-row" : ""
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div
                  className={`relative overflow-hidden ${
                    viewMode === "list" ? "w-1/3" : "h-64"
                  }`}
                >
                  <img
                    src={project.after}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-3 right-3">
                    <Badge className="bg-secondary/90 backdrop-blur-sm text-secondary-foreground border-0">
                      {project.type}
                    </Badge>
                  </div>
                </div>

                <div className={`p-6 ${viewMode === "list" ? "w-2/3" : ""}`}>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="text-xs border-secondary/30 text-secondary"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {project.location && (
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      {project.location}
                    </div>
                  )}
                </div>
              </Card>
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-foreground mb-2">لا توجد نتائج</h3>
              <p className="text-muted-foreground">جرب تغيير الفلاتر أو البحث بكلمات مختلفة</p>
            </div>
          )}
        </div>
      </section>

      {/* Project Details Dialog */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto" dir="rtl">
          {selectedProject && (
            <div className="space-y-6">
              <div className="relative h-96 rounded-lg overflow-hidden">
                <img
                  src={selectedProject.after}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-foreground mb-2">
                      {selectedProject.title}
                    </h2>
                    <p className="text-muted-foreground">{selectedProject.description}</p>
                  </div>
                  <Badge className="bg-secondary text-secondary-foreground">
                    {selectedProject.type}
                  </Badge>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <div className="text-sm text-muted-foreground mb-1">العميل</div>
                    <div className="font-semibold text-foreground">{selectedProject.category}</div>
                  </div>
                  {selectedProject.location && (
                    <div className="p-4 bg-muted/50 rounded-lg">
                      <div className="text-sm text-muted-foreground mb-1">الموقع</div>
                      <div className="font-semibold text-foreground">{selectedProject.location}</div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="text-sm text-muted-foreground mb-3">التخصصات المستخدمة</div>
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="px-4 py-2 border-secondary/30 text-secondary"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default Projects;
