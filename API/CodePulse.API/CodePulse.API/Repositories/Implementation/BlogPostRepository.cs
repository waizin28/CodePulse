using CodePulse.API.Data;
using CodePulse.API.Models.Domain;
using CodePulse.API.Repositories.Interface;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace CodePulse.API.Repositories.Implementation;

public class BlogPostRepository: IBlogPostRepository
{

    private readonly ApplicationDbContext _dbContext;
    
    public BlogPostRepository(ApplicationDbContext dbContext)
    {
        this._dbContext = dbContext;
    }
    
    public async Task<BlogPost> CreateAsync(BlogPost blogPost)
    {
        await _dbContext.BlogPosts.AddAsync(blogPost);
        await _dbContext.SaveChangesAsync();
        return blogPost;
    }

    public async Task<IEnumerable<BlogPost>> GetAllAsync()
    {
        // need to modify to get all the related categories of a blog by using Include -> telling we also want 
        // to include Categories
        return await _dbContext.BlogPosts.Include(x => x.Categories).ToListAsync();
    }

    public async Task<BlogPost?> GetByIdAsync(Guid id)
    {
        return await _dbContext.BlogPosts.Include(x => x.Categories).FirstOrDefaultAsync(x => x.Id == id);
    }

    public async Task<BlogPost?> UpdateAsync(BlogPost blogPost)
    {
        // fetch blogpost using id
        var existingBlogPost = await _dbContext.BlogPosts.Include(x => x.Categories).FirstOrDefaultAsync(x => x.Id == blogPost.Id);

        if (existingBlogPost == null)
        {
            return null;
        }
        
        // Update Blogpost
        _dbContext.Entry(existingBlogPost).CurrentValues.SetValues(blogPost);
        
        // Update Categories
        existingBlogPost.Categories = blogPost.Categories;
        
        await _dbContext.SaveChangesAsync();
        
        return blogPost;
    }

    public async Task<BlogPost> DeleteAsync(Guid id)
    {
        var existingBlogPost = await _dbContext.BlogPosts.FirstOrDefaultAsync(x => x.Id == id);
        if (existingBlogPost != null)
        {
            _dbContext.BlogPosts.Remove(existingBlogPost);
            await _dbContext.SaveChangesAsync();
            return existingBlogPost;
        }

        return null;
    }
}