export type Project = {
  id: string;
  title: string;
  subtitle: string;
  event: string;
  period: string;
  summary: string;
  highlights: string[];
  tech: string[];
  video: string | null;
  live: string | null;
  github: string | null;
};

export type Hackathon = {
  title: string;
  detail: string;
  date: string;
};

export type Certification = {
  title: string;
  issuer: string;
  date: string;
  detail: string;
  link: string | null;
};
