import { prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

/**
 * Grammatical person in Spanish verb conjugation.
 *
 * Format:
 * - "1s" = first person singular (yo)
 * - "2s" = second person singular (tú)
 * - "3s" = third person singular (él, ella, usted)
 * - "1p" = first person plural (nosotros, nosotras)
 * - "2p" = second person plural (vosotros, vosotras)
 * - "3p" = third person plural (ellos, ellas, ustedes)
 */
export type Person = '1s' | '2s' | '3s' | '1p' | '2p' | '3p';

export type Tense =
  | 'present'
  | 'preterite'
  | 'imperfect'
  | 'future'
  | 'conditional'
  | 'presentPerfect'
  | 'pluperfect'
  | 'futurePerfect'
  | 'conditionalPerfect';

export type Mood = 'indicative' | 'subjunctive' | 'imperative';

export type ProblemType = 'cloze' | 'multipleChoice';

class VerbSolution {
  /**
   * The conjugated form that completes the sentence
   * Example: "hablé"
   */
  @prop({ required: true })
  conjugated!: string;

  /**
   * The infinitive root form
   * Example: "hablar"
   */
  @prop({ required: true })
  infinitive!: string;

  /**
   * The grammatical person
   * Example: "1p"
   */
  @prop({ required: true })
  person!: Person;

  /**
   * The verb tense
   * Example: "futurePerfect"
   */
  @prop({ required: true })
  tense!: Tense;

  /**
   * The grammatical mood
   * Example: "indicative"
   */
  @prop()
  mood!: Mood;
}

/**
 * Additional context about the sentence containing the cloze problem.
 */
class VerbContext {
  /**
   * The full, original sentence with the verb included.
   * Example: "Yo hablé con ella ayer."
   */
  @prop({ required: true })
  fullSentence!: string;

  /**
   * Optional English translation of the sentence.
   */
  @prop()
  translation?: string;

  /**
   * Optional index of the verb in the sentence's tokenized form.
   */
  @prop()
  verbIndex?: number;
}

/**
 * Represents a single cloze-style conjugation problem.
 */
export class Problem {
  /**
   * Unique identifier for the problem.
   */
  @prop({ required: true, unique: true })
  id!: string;

  /**
   * Type of problem.
   */
  @prop({ required: true })
  type!: ProblemType;

  /**
   * The problem Elo.
   */
  @prop({ required: true })
  elo!: number;

  /**
   * The sentence with the target verb removed and replaced by a blank.
   * Example: "Yo ____ con ella ayer."
   */
  @prop({ required: true })
  sentence!: string;

  /**
   * The correct answer, including grammatical information.
   */
  @prop({ required: true, _id: false })
  solution!: VerbSolution;

  /**
   * Additional context for grading or display.
   */
  @prop({ required: true, _id: false })
  context!: VerbContext;

  /**
   * Optional multiple-choice options, including the correct one.
   */
  options?: [string, string, string, string];

  /**
   * Optional tags for filtering or categorization.
   * Examples: ["preterite", "irregular", "first_person"]
   */
  tags?: string[];
}

export const ProblemModel = getModelForClass(Problem);
