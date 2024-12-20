namespace CodePulse.API.Models.Domain;

public class Category
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string UrlHandle { get; set; }
    
    // Single category can have collections of blogpost
    public ICollection<BlogPost> BlogPosts { get; set; }
}