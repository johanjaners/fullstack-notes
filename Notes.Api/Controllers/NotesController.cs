using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Notes.Api.Data;
using Notes.Api.Models;

namespace Notes.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotesController : ControllerBase
    {
        private readonly NotesDbContext _context;

        public NotesController(NotesDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Note>>> GetAll()
        {
            var notes = await _context.Notes
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();

            return Ok(notes);
        }

        [HttpGet("{id:int}")]
        public async Task<ActionResult<Note>> GetById(int id)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null) return NotFound();
            return Ok(note);
        }


        [HttpPost]
        public async Task<ActionResult<Note>> Create([FromBody] CreateNoteDto dto)
        {
            var note = new Note
            {
                Title = dto.Title,
                Content = dto.Content,
                CreatedAt = DateTime.UtcNow
            };

            _context.Notes.Add(note);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = note.Id }, note);
        }

        public class CreateNoteDto
        {
            public string Title { get; set; } = string.Empty;
            public string Content { get; set; } = string.Empty;
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNote(int id)
        {
            var note = await _context.Notes.FindAsync(id);
            if (note == null) return NotFound();

            _context.Notes.Remove(note);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
