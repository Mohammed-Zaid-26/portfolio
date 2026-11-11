import experienceData from "@/data/experience.json";
import profile from "@/data/profile.json";

/**
 * Qedence (the co-founded startup) is hidden from the public site while job hunting,
 * so the portfolio matches the resume. Nothing is deleted: the Qedence section,
 * its data (startup.json, experience.json, skills.json) and the founder-focused copy
 * all stay in the code. Set this to `true` to bring everything back.
 */
export const SHOW_QEDENCE = false;

const isQedence = (value: string) => /qedence/i.test(value);

/** Experience entries shown on the site (Journey cards, hero engagement count). */
export const visibleExperience = SHOW_QEDENCE
  ? experienceData
  : experienceData.filter((e) => !isQedence(e.company));

/** Headline titles; "Entrepreneur" only appears alongside Qedence. */
export const visibleTitles = SHOW_QEDENCE ? profile.titles : profile.titles.filter((t) => t !== "Entrepreneur");

/** Drops Qedence from lists such as a skill group's "Applied in". */
export const withoutQedence = (items: string[]) => (SHOW_QEDENCE ? items : items.filter((i) => !isQedence(i)));
