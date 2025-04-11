describe('text.js Tests', () => {
  let noteForm, noteText, noteDate, notesList;

  beforeEach(() => {
    document.body.innerHTML = `
      <form id="noteForm">
        <textarea id="noteText" placeholder="Write your note"></textarea>
        <input type="date" id="noteDate" />
        <button type="submit">Add Note</button>
      </form>
      <div id="notesList"></div>
    `;

    noteForm = document.getElementById('noteForm');
    noteText = document.getElementById('noteText');
    noteDate = document.getElementById('noteDate');
    notesList = document.getElementById('notesList');

    require('../js/text');
  });

  test('Should add a note to the notes list', () => {
    noteText.value = 'This is a test note';
    noteDate.value = '2025-01-10';

    noteForm.dispatchEvent(new Event('submit'));

    const notes = notesList.querySelectorAll('.note');
    expect(notes.length).toBe(1);

    const note = notes[0];
    expect(note.querySelector('p').textContent).toBe(
      'Note: This is a test note'
    );
    expect(note.querySelector('time').getAttribute('datetime')).toBe(
      '2025-01-10'
    );
    expect(note.querySelector('time').textContent).toBe(
      new Date('2025-01-10').toLocaleString()
    );
  });

  test('Should clear the form after adding a note', () => {
    noteText.value = '';
    noteDate.value = '';

    noteForm.dispatchEvent(new Event('submit'));

    expect(noteText.value).toBe('');
    expect(noteDate.value).toBe('');
  });
});
