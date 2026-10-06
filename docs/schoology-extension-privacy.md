# Campus Schoology Reader — Privacy

Last updated October 6, 2026.

## Purpose and data used

Campus Schoology Reader reads academic information from the Schoology account you are already signed into at heschel.schoology.com. Sync begins when you choose Sync academic data. Information can include your source account identifier, subjects and sections, material and folder names, assignment instructions and deadlines, reported grades and exceptions, grading periods and category weights, submission-status labels, academic comments, events, attachment names and source references, and capture/coverage information.

The reader accesses only supported school academic pages and resources needed for these features, not your general browsing history. It uses the existing browser session for authenticated requests; it does not ask for your Schoology password or extract and store browser cookies. Raw response markup is parsed temporarily; normalized exports exclude scripts, hidden form inputs, session tokens and signed CDN URLs.

## Storage and exports

Checkpoints and account-separated snapshots are stored locally in this extension's IndexedDB. They remain until extension data is removed or the extension is uninstalled. JSON export saves academic metadata only when you select Export JSON. You control the exported files and whether to import them into Campus. Campus stores deliberately imported data and separate local planning state in its own browser-origin storage.

Original PDFs download only when you select Download original PDFs and grant optional files-cdn.schoology.com access. The reader validates supported MIME/signature/end-marker checks, measures sizes, and computes SHA-256 hashes. Original files and a failure/integrity manifest are saved separately to your downloads. Signed redirect URLs are used transiently and are not saved in metadata. PDF text extraction and OCR are unavailable.

## Sharing and network requests

The extension makes HTTPS requests to heschel.schoology.com and, for requested file downloads, files-cdn.schoology.com. It does not send academic information to the extension developer, advertising services, analytics services, AI services or another collection backend. It does not sell user data or use it for creditworthiness or lending decisions. Exported files remain under your control; uploading or sharing them yourself is separate from extension operation.

The use of information received through this extension is limited to providing its user-facing academic sync, local snapshot export and requested file-download features, consistent with the Chrome Web Store User Data Policy and its Limited Use requirements.

## Controls and deletion

You can cancel sync, retain its last checkpoint, restrict site access, or remove the extension through Chrome. Removing extension data does not delete files already saved in your Downloads folder or academic snapshots already imported into Campus. Delete those separately if desired. Returning to demo or Reset demo in Campus preserves saved Schoology data.

## Publisher contact

For questions, use the publisher contact shown on the extension's Chrome Web Store listing. This extension is an independent Campus tool and is not affiliated with or endorsed by Schoology, PowerSchool or the school.
