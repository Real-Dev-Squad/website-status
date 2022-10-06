import { useRouter } from "next/router";

const TaskDetailsPage = () => {
  
  const router = useRouter()
  const {title,type,status,links,participants,assignee,startedOn,endsOn} = router.query
    
  return(
  <>
  {/* dummy UI */}
  <div>This is tasks details page</div>
  <p>
    Title:{title},Type:{type},status:{status},links:{links},participants:{participants},
    assignee:{assignee},startedOn:{startedOn},endsOn:{endsOn}
    </p>
  </>
  );
};

export default TaskDetailsPage;
