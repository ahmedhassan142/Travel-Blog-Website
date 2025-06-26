"use client"
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useParams } from 'next/navigation';
// ,
const commentSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  email: z.string().email('Invalid email address'),
  content: z.string().min(20, 'Comment must be at least 20 characters')
});
type Commentformprops={};
export default  function Commentform(){
  const params = useParams();
  const blogslug = String(params?.blogslug)
  console.log("Extracted blogslug:", blogslug);
    const {formState:{errors},register,handleSubmit,reset}=useForm<z.infer<typeof commentSchema>>({resolver:zodResolver(commentSchema)})
    const onSubmit = async (data: z.infer<typeof commentSchema>) => {
      try {
        const response = await axios.post(`/api/comments/${blogslug}`, data);
        console.log("Response:", response.data);
        if (response.data.success) {
          alert("Comment posted successfully!");
          reset();
        } else {
          alert("Failed to post comment.");
        }
        
      } catch (error) {
        console.error("Error posting comment:", error);
        alert("Failed to post comment due to a server issue.");
      }
    };
 return (
        <Card className="w-full max-w-2xl mx-auto bg-white dark:bg-gray-900 shadow-lg rounded-2xl p-6">
          <CardContent>
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">Leave a Comment</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Input
                  placeholder="Your Name"
                  {...register('name')}
                  className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">{String(errors.name.message)}</p>}
              </div>
    
              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  {...register('email')}
                  className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">{String(errors.email.message)}</p>}
              </div>
    
              <div>
                <Textarea
                  placeholder="Your Comment"
                  {...register('content')}
                  className="border border-gray-300 dark:border-gray-700 rounded-lg p-3 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.content && <p className="text-red-500 text-sm mt-1">{String(errors.content.message)}</p>}
              </div>
    
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all duration-300"
              >
                Submit Comment
              </Button>
            </form>
          </CardContent>
        </Card>
      )

}