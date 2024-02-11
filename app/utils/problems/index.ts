import { Problem } from "@/app/utils/problem";
import { reverseLinkedList } from "@/app/utils/problems/reverse-linked-list";
import { twoSum } from "@/app/utils/problems/two-sum";
import { jumpGame } from "@/app/utils/problems/jump-game";
import { search2DMatrix } from "@/app/utils/problems/search-a-2d-matrix";
import { validParentheses } from "@/app/utils/problems/valid-parentheses";

interface ProblemMap {
  [key: string]: Problem;
}

export const problems: ProblemMap = {
  "two-sum": twoSum,
  "reverse-linked-list": reverseLinkedList,
  "jump-game": jumpGame,
  "search-a-2d-matrix": search2DMatrix,
  "valid-parentheses": validParentheses,
};
