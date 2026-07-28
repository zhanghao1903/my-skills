from __future__ import annotations

import unittest
from pathlib import Path

PLUGIN_ROOT = Path(__file__).resolve().parents[1]
PACKAGED_ROOT = PLUGIN_ROOT / "skills"
EXPECTED_FILES = {
    "feature-lifecycle": {
        Path("SKILL.md"),
        Path("agents/openai.yaml"),
    },
    "product-workflow-gate": {
        Path("SKILL.md"),
        Path("agents/openai.yaml"),
    },
    "technical-plan-write": {
        Path("SKILL.md"),
        Path("agents/openai.yaml"),
    },
    "technical-plan-review": {
        Path("SKILL.md"),
        Path("agents/openai.yaml"),
    },
    "pr-review": {
        Path("SKILL.md"),
        Path("agents/openai.yaml"),
        Path("examples/example-pr-review-previous-result.json"),
        Path("examples/example-pr-review-report.md"),
        Path("examples/example-pr-review-result.json"),
        Path("references/re-review-gates.md"),
        Path("schemas/pr-review-result.schema.json"),
        Path("scripts/validate_review_result.py"),
        Path("templates/PR_REVIEW_REPORT.md"),
    },
}


class PackagedSourceSkillTests(unittest.TestCase):
    def test_composition_skill_resources_are_self_contained(self) -> None:
        for name, expected in EXPECTED_FILES.items():
            root = PACKAGED_ROOT / name
            actual = {
                path.relative_to(root)
                for path in root.rglob("*")
                if path.is_file() and "__pycache__" not in path.parts
            }
            self.assertEqual(actual, expected, name)

    def test_composition_agent_metadata_is_explicit_only(self) -> None:
        for name in EXPECTED_FILES:
            metadata = (PACKAGED_ROOT / name / "agents" / "openai.yaml").read_text(
                encoding="utf-8"
            )
            self.assertEqual(metadata.count("\npolicy:\n"), 1, name)
            self.assertIn("allow_implicit_invocation: false", metadata, name)
            self.assertIn("interface:", metadata, name)

    def test_packaged_skills_have_no_repository_only_files(self) -> None:
        for name in EXPECTED_FILES:
            root = PACKAGED_ROOT / name
            self.assertFalse((root / "README.md").exists(), name)
            self.assertFalse((root / "tests").exists(), name)


if __name__ == "__main__":
    unittest.main()
