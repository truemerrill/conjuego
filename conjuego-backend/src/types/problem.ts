
export type Person =
  | "1s"  // yo
  | "2s"  // tú
  | "3s"  // él, ella, usted
  | "1p"  // nosotros, nosotras
  | "2p"  // vosotros, vosotras
  | "3p"; // ellos, ellas, ustedes


export type Tense =
  | "present"
  | "preterite"
  | "imperfect"
  | "future"
  | "conditional"
  | "presentPerfect"
  | "pluperfect"
  | "futurePerfect"
  | "conditionalPerfect";


export type Mood =
  | "indicative"
  | "subjunctive"
  | "imperative";


export type ProblemType =
  | "cloze"
  | "multipleChoice";


export interface VerbSolution {

  /** 
   * The conjugated form that completes the sentence 
   * Example: "hablé"
   */
  conjugated: string;

  /**
   * The infinitive root form
   * Example: "hablar"
   */
  infinitive: string;

  /** 
   * The grammatical person 
   * Example: "1p"
   */
  person: Person;

  /**
   * The verb tense
   * Example: "futurePerfect"
   */
  tense: Tense;

  /**
   * The grammatical mood
   * Example: "indicative"
   */
  mood: Mood;

}


/**
 * Additional context about the sentence containing the cloze problem.
 */
export interface VerbContext {
  /**
   * The full, original sentence with the verb included.
   * Example: "Yo hablé con ella ayer."
   */
  fullSentence: string;

  /**
   * Optional English translation of the sentence.
   */
  translation?: string;

  /**
   * Optional index of the verb in the sentence's tokenized form.
   */
  verbIndex?: number;
}


/**
 * Frequency metadata describing how common the verb and its form are.
 */
export interface VerbFrequency {
  /**
   * Rank of the infinitive (lemma) in overall Spanish frequency.
   * Lower values = more common. Example: hablar = 120
   */
  infinitiveRank: number;

  /**
   * Rank of the specific conjugated form.
   * Example: "hablé" might be less common than "habla"
   */
  formRank: number;
}

/**
 * Represents a single cloze-style conjugation problem.
 */
export interface Problem {
  /**
   * Unique identifier for the problem.
   */
  id: string;

  /**
   * Type of problem.
   */
  type: ProblemType;

  /**
   * The problem Elo.
   */
  elo: number;

  /**
   * The sentence with the target verb removed and replaced by a blank.
   * Example: "Yo ____ con ella ayer."
   */
  sentence: string;

  /**
   * The correct answer, including grammatical information.
   */
  solution: VerbSolution;

  /**
   * Additional context for grading or display.
   */
  context: VerbContext;

  /**
   * Optional multiple-choice options, including the correct one.
   */
  options?: [string, string, string, string];

  /**
   * Optional frequency information for difficulty tuning.
   */
  frequency?: VerbFrequency;

  /**
   * Optional difficulty level (e.g. 1–5 scale).
   */
  difficulty?: number;

  /**
   * Optional tags for filtering or categorization.
   * Examples: ["preterite", "irregular", "first_person"]
   */
  tags?: string[];
}