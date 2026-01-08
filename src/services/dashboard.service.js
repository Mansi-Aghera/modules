import api from "./api2";

const safeCount = (res) => res.data?.data?.length ?? res.data?.length ?? 0;

export const getDashboardStats = async () => {
  const [
    faqs,
    testimonials,
    categories,
    courses,
    articles,
    modules,
    topics,
  ] = await Promise.all([
    api.get("/faqs/"),
    api.get("/testimonials/"),
    api.get("/category/"),
    api.get("/course/"),
    api.get("/articles/"),
    api.get("/modules/"),
    api.get("/topics/"),
  ]);

  return {
    faqs: safeCount(faqs),
    testimonials: safeCount(testimonials),
    categories: safeCount(categories),
    courses: safeCount(courses),
    articles: safeCount(articles),
    modules: safeCount(modules),
    topics: safeCount(topics),
  };
};
