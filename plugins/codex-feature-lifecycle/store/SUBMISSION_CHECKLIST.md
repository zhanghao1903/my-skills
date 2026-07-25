# Public Directory Submission Checklist

Official submission entry point:
https://platform.openai.com/plugins

## Repository and release

- [ ] PR #4 is reviewed against an exact base and head SHA.
- [ ] All blocking findings are resolved and the final head is re-reviewed.
- [ ] Required checks and local validators pass.
- [ ] PR #4 is non-draft and merged into `main`.
- [ ] `main` contains plugin version `0.2.0`, user documentation, policies,
      listing copy, and test cases.
- [ ] Public website, support, privacy, terms, and source URLs return
      successfully without authentication.
- [ ] A final submission ZIP is built from the merged `main` tree and its SHA-256
      digest is recorded.

## Platform access

- [ ] Submit from the intended OpenAI Platform organization and project.
- [ ] The submitter has `Apps Management` write permission.
- [ ] The selected developer or business identity is verified and matches the
      public name, website, support contact, privacy policy, and terms.

## Submission form

- [ ] Select **Create plugin** → **Skills only**.
- [ ] Copy the listing fields from `LISTING.md`.
- [ ] Upload the production logo from `assets/`.
- [ ] Upload the final skill/plugin bundle from the merged release tree.
- [ ] Confirm every `SKILL.md` and referenced script, schema, template, and
      asset is present in the uploaded tree.
- [ ] Add the four starter prompts from `LISTING.md`.
- [ ] Add all five positive and three negative cases from `TEST_CASES.md`.
- [ ] Select only publisher-approved countries or regions.
- [ ] Copy the initial release notes from `LISTING.md`.
- [ ] Complete policy attestations only after all fields and test evidence are
      accurate.

## Final gate

- [ ] Re-read the complete draft and verify no secrets, private repository
      paths, private task IDs, credentials, or internal-only evidence appear.
- [ ] Confirm the uploaded version and digest match the reviewed merged tree.
- [ ] Select **Submit for Review**.
- [ ] Record the portal submission ID, submission time, status, and uploaded
      digest in the feature lifecycle document.

Submission starts review; it does not publish the plugin. After approval, the
publisher must separately choose when to publish it.
