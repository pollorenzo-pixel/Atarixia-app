## Summary
- What changed?
- Why was this needed?

## Branch Flow Checklist
- [ ] I merged/rebased from `main` into `preview` before starting (or confirmed branches are aligned).
- [ ] This PR targets `preview` (default path for new work).
- [ ] I tested the following before requesting review:
  - [ ] Audio playback flow
  - [ ] Timer/session circle behavior
  - [ ] Mode navigation (Welcome/Introduction/Foundation/Stability/Profile)
  - [ ] Profile/progress/streak updates
  - [ ] Reflection + completion states
  - [ ] Mobile viewport responsiveness

## Risk Review
- [ ] I avoided changing storage keys unless migration logic is included.
- [ ] I avoided large formatting-only churn.
- [ ] I kept behavior backward-compatible or documented any intentional behavior change.

## Notes for Reviewers
- Any fragile areas touched:
- Any follow-up tasks:
