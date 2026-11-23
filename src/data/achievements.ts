import type { Hackathon, Certification } from "../types";

export const hackathons: Hackathon[] = [
  {
    title: "Smart India Hackathon 2026, internal round",
    detail: "Cleared the internal round; SportsIQ advanced to the final.",
    date: "2026",
  },
  {
    title: "SIH 2026, Oil India Ltd (SIH26122)",
    detail: "Built ProgressSync AI.",
    date: "Sep to Oct 2026",
  },
  {
    title: "SIH 2026, IMD (SIH26073)",
    detail: "Built SkyGuard AI.",
    date: "Sep to Oct 2026",
  },
  {
    title: "IISc hackathon",
    detail: "Participation certificate.",
    date: "1 Apr 2026",
  },
];

export const certifications: Certification[] = [
  {
    title: "Oracle Cloud Infrastructure Certified AI Foundations Associate",
    issuer: "Oracle",
    date: "18 Oct 2026",
    detail:
      "AI and ML, generative AI, LLMs, RAG, AI agents, embeddings, vector search, OCI AI services, responsible AI.",
    link: "https://catalog-education.oracle.com/ords/certview/sharebadge?id=01E5B07AD74E98B23E82FBFF59C9E8F2367DBB5DAA2D0CF49B81FEF396D19C76",
    image: "./images/oracle-ai-foundations.png",
  },
  {
    title: "AWS Academy Graduate - Cloud Foundations - Training Badge",
    issuer: "Amazon Web Services Training and Certification",
    date: "20 Apr 2026",
    detail:
      "Cloud fundamentals, EC2, S3, RDS, VPC, IAM, CloudWatch, Well-Architected Framework.",
    link: "https://www.credly.com/badges/5d3470d6-80ec-40e5-8efc-d06dad2cf669/print",
    image: "./images/aws-cloud-foundations.png",
  },
  {
    title: "AWS Academy Graduate - Machine Learning Foundations - Training Badge",
    issuer: "Amazon Web Services Training and Certification",
    date: "13 Apr 2026",
    detail:
      "ML pipeline, SageMaker, applied AI services for vision, NLP and forecasting.",
    link: "https://www.credly.com/badges/5d3470d6-80ec-40e5-8efc-d06dad2cf669/print",
    image: "./images/aws-machine-learning-foundations.png",
  },
];
