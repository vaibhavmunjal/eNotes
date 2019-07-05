from django.shortcuts import render, reverse
from django.http import HttpResponse, JsonResponse
from django.template import Context, loader
from django.shortcuts import render_to_response

from .models import Notes
from .forms import Notes_Form

from datetime import date

def home(request):
    '''Home page loads all tha data.'''
    notes = Notes.objects.order_by('-id').all()
    print(notes)
    context = { 'notes': notes}
    return render(request, 'notes/index.html', context)


def create_note(request, method=["GET", "POST"]):
    '''This page loads under the Home page at dynamic/call time'''
    if request.method == "GET":
        return render_to_response("notes/createNote.html")
        # template = loader.get_template("notes/createNote.html")
        # return HttpResponse(template.render())
    if request.method == "POST":
        ques = request.POST.get("ques")
        ans = request.POST.get("ans")
        catg = request.POST.get("category")
        link = request.POST.get("link")
        doc = request.POST.get("doc")
        try:
            print(ques, ans, catg, doc, link)
            print("before notes get")
            try:
                note = Notes.objects.get(ques=ques)
                note.ans = ans if ans != '' else note.ans
                note.category = catg if catg != '' else note.category
                note.link = link if link != '' else note.link
                note.doc = doc if doc != '' else note.doc
                note.save()
                result = {"status": "Note Updated", "id": note.id}
            except:
                note = Notes(ques=ques,
                            ans=ans,
                            category=catg,
                            link=link,
                            doc=doc)
                note.save()
                result = {"status": "Note created"}
        except:
            result = {"status": "Failed to save the Note"}
    return JsonResponse(result)


def delete_note(request, method=["POST"]):
    '''Delete the note.'''
    try:
        id = request.POST.get("id")
        Notes.objects.get(id=id).delete()
        result = {"deleted": True}
    except:
        result = {"deleted": False}
    return JsonResponse(result)


def load_today_notes(request):
    from datetime import datetime
    notes = (Notes.objects
	# .filter(create_date=datetime.now())
                          .order_by('-id')
                          .values('ques',
                                  'ans',
                                  'category',
                                  'link',
                                  'doc',
                                  'id'))
    notes_list = list(notes)
    # return JsonResponse(notes_list, safe=False)
    notes = Notes.objects.order_by('-id').all()
    return render_to_response("notes/newNotes.html", {"notes": notes})


def ques_exist(request, method=["POST"]):
    try:
        ques = request.POST.get("ques")
        note = Notes.objects.get(ques=ques)
        if note:
            status = {'exists': True}
    except:
        status = {'exist': False}
    return JsonResponse(status)